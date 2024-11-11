/* eslint-disable no-underscore-dangle */
const {
  UserInputError,
  ApolloError,
  AuthenticationError
} = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {
  loginValidator,
  userValidator,
  codeValidator,
  signOnValidator,
  resetPasswordValidator
} = require('../validation/userValidator')
const { User, Church } = require('../model')
const { sendGridMail } = require('../lib/mail')
const { compileEmailTemplate } = require('../util/compile-email-template')
const { ROLES, config } = require('../configs')
const { createUserSubscription } = require('./subscriptionService')
const { logger } = require('../util/logger')

const {
  generatePassword,
  comparePassword,
  verifyToken
} = require('../util/helper')

const generateToken = (currentUser, expiresIn) => {
  const {
    _id,
    email,
    first_name,
    last_name,
    mobile,
    role,
    user_status
  } = currentUser
  const {
    subscriptionId,
    stripe_user_id,
    stripeCustomerId,
    address,
    currency,
    tax_rate,
    plan,
    startDate,
    endDate,
    status,
    isSearchable,
    onboardingComplete,
    sort_code,
    account_number,
    bank_name,
    reference,
    features,
    prayer_request_email,
    giving_url,
    enable_url_giving,
    enable_bank_transfer,
    enable_app_giving,
  } = currentUser.church
  const token = jwt.sign(
    {
      userId: _id,
      email,
      first_name,
      mobile,
      last_name,
      role,
      suid: currentUser.church._id
    },
    config.JWT_SECRET,
    {
      expiresIn
    }
  )

  const user = {
    userId: _id,
    suid: currentUser.church._id,
    stripeCustomerId,
    stripe_user_id,
    subscriptionId,
    plan,
    startDate,
    endDate,
    status,
    email,
    first_name,
    mobile,
    last_name,
    role,
    user_status,
    church: {
      email: currentUser.church.email,
      mobile: currentUser.church.mobile,
      name: currentUser.church.name,
      description: currentUser.church.description,
      secure_url: currentUser.church.secure_url,
      public_id: currentUser.church.public_id,
      logo_url: currentUser.church.logo_url,
      logo_id: currentUser.church.logo_id     
    },
    address,
    currency,
    tax_rate,
    isSearchable,
    sort_code,
    account_number,
    bank_name,
    reference,
    features,
    prayer_request_email,
    giving_url,
    enable_url_giving,
    enable_bank_transfer,
    enable_app_giving,
    onboardingComplete
  }
  return { token, user }
}

async function createSubscription(subscriber, role = ROLES.ADMIN) {
  const {
    first_name,
    last_name,
    mobile,
    email,
    password,
    address,
    church_name
  } = subscriber

  const body = {
    first_name,
    last_name,
    mobile,
    email,
    role,
    user_status: true,
    password: await generatePassword(password)
  }

  const new_church = {
    name: church_name,
    mobile,
    email
  }

  const validateResult = userValidator(body)
  if (validateResult.length) {
    throw new UserInputError(validateResult.map(it => it.message).join(','), {
      invalidArgs: validateResult.map(it => it.field).join(',')
    })
  }

  const existingUser = await User.findOne({
    email: { $regex: new RegExp(`^${email.toLowerCase()}`, 'i') }
  })
  if (existingUser) {
    throw new UserInputError(
      'The email address you provided has already been used'
    )
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const church = new Church({
      address,
      ...new_church
    })

    const newChurch = await church.save({ session })
    if (!newChurch) {
      throw new Error('Church could not be saved')
    }

    const user = new User({
      church: newChurch._id,
      ...body
    })

    const newUser = await user.save({ session })
    if (!newUser) {
      throw new Error('User could not be saved')
    }

    const payUser = {
      suid: newChurch._id,
      id: newUser._id,
      role,
      address,
      ...new_church
    }

    const result = await createUserSubscription(payUser, subscriber)

    await session.commitTransaction()
    session.endSession()

    return result
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    logger.error(error)
    throw new ApolloError(error.message)
  }
}

async function login({ email }) {
  const validateResult = loginValidator({ email })
  if (validateResult.length) {
    return new UserInputError(validateResult.map(it => it.message).join(','), {
      invalidArgs: validateResult.map(it => it.field).join(',')
    })
  }

  const user = await User.findOne({ email: new RegExp(email, 'i') })
  if (!user) {
    throw new UserInputError('No user found with this login credentials.')
  }

  await sendVerificationCode(user)
  return true
}
async function sendVerificationCode(user) {
  try {
    const code = Math.floor(100000 + Math.random() * 900000)
    user.otp = code
    await user.save()

    const { first_name, last_name, email } = user

    const template = await compileEmailTemplate({
      fileName: 'codeVerification.mjml',
      data: {
        name: `${first_name} ${last_name}`,
        code,
        contact_email: process.env.CONTACT_EMAIL,
        team: process.env.TEAM
      }
    })

    const mailOptions = {
      from: process.env.USER_NAME,
      to: `${email}`,
      subject: 'Your code verification',
      text: 'Your code verification',
      html: template
    }

    sendGridMail(mailOptions)
    return true
  } catch (error) {
    logger.error(error)
  }
}
async function verificationCode({ email, code }) {
  const validateResult = codeValidator({ email, code })
  if (validateResult.length) {
    throw new UserInputError(validateResult.map(it => it.message).join(','), {
      invalidArgs: validateResult.map(it => it.field).join(',')
    })
  }

  try {
    const user = await User.findOne({ email: new RegExp(email, 'i') })
    if (!user) {
      throw new UserInputError('No user found with this credentials.')
    }

    if (user.otp !== code) {
      throw new UserInputError('Invalid code')
    }

    user.otp = null
    await user.save()

    const token = generateToken(user, config.DURATION)
    return token
  } catch (error) {
    logger.error(error)
  }
}
async function signOn({ email, password }) {
  const validationErrors = signOnValidator({ email, password })
  if (validationErrors.length > 0) {
    const errorMessages = validationErrors
      .map(error => error.message)
      .join(',')
    const invalidArgs = validationErrors.map(error => error.field).join(',')
    throw new UserInputError(errorMessages, { invalidArgs })
  }

  try {
    const existingUser = await User.findOne({
      email: new RegExp(email, 'i')
    }).populate('church')
    if (!existingUser || !existingUser.password) {
      throw new AuthenticationError(
        'No user found with these login credentials.'
      )
    }

    const matchPassword = await comparePassword(
      password,
      existingUser.password
    )
    if (!matchPassword) {
      throw new AuthenticationError(
        'No user found with these login credentials.'
      )
    }

    const token = generateToken(existingUser, config.DURATION)
    return token
  } catch (error) {
    logger.error(error)
    throw new AuthenticationError(
      'No user found with these login credentials.'
    )
  }
}

async function forgotPassword({ email }) {
  const validateResult = loginValidator({ email })
  if (validateResult.length) {
    return new UserInputError(validateResult.map(it => it.message).join(','), {
      invalidArgs: validateResult.map(it => it.field).join(',')
    })
  }

  try {
    const user = await User.findOne({ email: new RegExp(email, 'i') })
    if (!user) {
      throw new AuthenticationError(
        "Sorry, we couldn't find a user with that email address. Please sign up to create a new account.!"
      )
    }

    const code = Math.floor(100000 + Math.random() * 900000)
    user.otp = code
    await user.save()

    const reset_token = jwt.sign({ otp: code, email }, process.env.JWT_SECRET)

    const template = await compileEmailTemplate({
      fileName: 'forgotPassword.mjml',
      data: {
        name: `${user.first_name} ${user.last_name}`,
        reset_url: `${process.env.RESET_PASSWORD_URL}?&token=${reset_token}`,
        contact_email: process.env.CONTACT_EMAIL,
        team: process.env.TEAM
      }
    })

    const mailOptions = {
      from: process.env.USER_NAME,
      to: `${email}`,
      subject: 'Instructions for changing your Jerur Account password',
      text: 'Instructions for changing your Jerur Account password',
      html: template
    }

    sendGridMail(mailOptions)
    return true
  } catch (error) {
    logger.error(error)
  }
}

async function resetPassword(password, token) {
  const { email, otp } = verifyToken(token)
  const {
    passwordValidationResult,
    tokenValidationResult
  } = resetPasswordValidator(password, token)

  if (passwordValidationResult.length) {
    return new UserInputError(
      passwordValidationResult.map(it => it.message).join(','),
      {
        invalidArgs: passwordValidationResult.map(it => it.field).join(',')
      }
    )
  }

  if (!tokenValidationResult.valid) {
    return new UserInputError(tokenValidationResult.error)
  }

  try {
    const matchUser = await User.findOne({
      $and: [{ email: new RegExp(email, 'i') }, { otp }]
    })

    if (!matchUser) {
      throw new AuthenticationError(
        "Sorry, we couldn't find an account associated with the email. Please check your details and try again, or sign up for a new account if you don't have one yet."
      )
    }

    matchUser.password = await generatePassword(password)
    await matchUser.save()

    return true
  } catch (error) {
    logger.error(error)
  }
}

module.exports = {
  login,
  verificationCode,
  createSubscription,
  signOn,
  resetPassword,
  forgotPassword
}
