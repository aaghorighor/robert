/* eslint-disable space-before-function-paren */
const { UserInputError, ApolloError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const {
  memberValidator,
  pinValidator,
  loginValidator
} = require('../validation/userValidator')
const { identifierValidator } = require('../validation/identifierValidator')
const Member = require('../model/member')
const { config } = require('../configs')
const { logger } = require('../util/logger')
const { sendGridMail } = require('../lib/mail')
const { compileEmailTemplate } = require('../util/compile-email-template')

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

  const member = {
    _id,
    church: currentUser.church._id,
    email,
    first_name,
    mobile,
    last_name,
    role,
    user_status
  }
  return { token, member }
}
function getMembers({ suid }) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  try {
    return Member.find({ church: suid }).sort({ createdAt: -1 })
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}
async function getMemberCount({ suid }) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(', '),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  try {

    const members = await Member.find({ church: suid })
    const activeCount = members.filter(member => member.user_status)?.length
    const noneActiveCount = members?.length - activeCount

    return { activeCount, noneActiveCount }
  } catch (error) {
    logger.error('Error getting member count:', error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

function getMember(id) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  try {
    const result = Member.findOne({ _id: id })
    return result
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}
async function createMember(body) {
  const { suid } = body
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = memberValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const newUser = await Member.create({
      church: suid,
      pin: 1234,
      role: 'member',
      ...body
    })

    if (!newUser) {
      throw new ApolloError('create new member failed')
    }

    const token = generateToken(newUser, config.DURATION)   
    return token 
  } catch (error) {
    logger.error(error)
    if (error.code === 11000) {
      throw new Error('This email address is already registered.')
    } else {
      throw new Error('An unexpected error occurred. Please try again.')
    }
  }
}
async function createMemberManual(body) {
  const { suid } = body
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = memberValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const newUser = await Member.create({
      church: suid,
      pin: 1234,
      role: 'member',
      ...body
    })

    if (!newUser) {
      throw new ApolloError('create new member failed')
    }
 
    return newUser 
  } catch (error) {
    logger.error(error)
    if (error.code === 11000) {
      throw new Error('This email address is already registered.')
    } else {
      throw new Error('An unexpected error occurred. Please try again.')
    }
  }
}
async function updateMember(body) {
  const { _id } = body
  const identifierValidateResult = identifierValidator(_id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = memberValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const updatedMember = await Member.findByIdAndUpdate(_id, body, {
      new: true
    })

    if (!updatedMember) {
      throw new ApolloError('Member not found or update failed')
    }

    return true
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}
async function verificationPin({ email, pin }) {
  const validateResult = pinValidator({ email, pin })
  if (validateResult.length) {
    throw new UserInputError(validateResult.map(it => it.message).join(','), {
      invalidArgs: validateResult.map(it => it.field).join(',')
    })
  }
  
  try {
    const member = await Member.findOne({ email: new RegExp(email, 'i') })
    
    if (!member) {
      throw new UserInputError('No Member found with this credentials.')
    }
 
    if (member.pin !== pin) {
      throw new UserInputError('Invalid code')
    }   

    await member.save()

    const token = generateToken(member, config.DURATION)   
    return token
  } catch (error) {
    logger.error(error)
    throw new Error(error.message)
  }
}
async function verifyPin({ email }) {
  const validateResult = loginValidator({ email })
  if (validateResult.length) {
    return new UserInputError(validateResult.map(it => it.message).join(','), {
      invalidArgs: validateResult.map(it => it.field).join(',')
    })
  }

  const member = await Member.findOne({ email: new RegExp(email, 'i') })
  if (!member) {
    throw new UserInputError('No Member found with this login credentials.')
  }

  await sendVerificationCode(member)
  return true
}
async function sendVerificationCode(member) {
  try {
    const code = Math.floor(1000 + Math.random() * 9000)
    member.pin = code
    await member.save()

    const { first_name, last_name, email } = member

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
    throw new Error('An unexpected error occurred. Please try again.')
  }
}
async function removeMember({ suid }, id) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  try {
    await Member.findOneAndDelete({ _id: id, church: suid })
    return true
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

module.exports = {
  getMembers,
  removeMember,
  updateMember,
  getMember,
  verificationPin,
  createMember,
  verifyPin,
  getMemberCount,
  createMemberManual
}
