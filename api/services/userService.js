const { UserInputError, ApolloError } = require('apollo-server')
const {
  userValidator,
  passwordValidator
} = require('../validation/userValidator')
const { identifierValidator } = require('../validation/identifierValidator')
const User = require('../model/user')
const { generatePassword } = require('../util/helper')
const { logger } = require('../util/logger')

function getUsers({ suid }) {
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
    return User.find({ church: suid })
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

function getUser(id) {
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
    return User.find({ _id: id })
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

async function createUser({ suid }, body) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = userValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const { password, change_password, ...updatedBody } = body

    const newUser = await User.create({
      church: suid,
      password: await generatePassword(password),
      ...updatedBody
    })

    if (!newUser) {
      throw new ApolloError('create new user failed')
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

async function updateUser({ suid }, body) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = userValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  const { _id, password, change_password, ...updatedBody } = body

  if (change_password) {
    body = {
      ...updatedBody,
      password: await generatePassword(password)
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, body, {
      new: true
    })

    if (!updatedUser) {
      throw new ApolloError('User not found or update failed')
    }

    return true
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

async function changePassword({ id }, password) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const passwordErrors = passwordValidator({ password })
  if (passwordErrors.length) {
    throw new UserInputError(passwordErrors.map(it => it.message).join(','), {
      invalidArgs: passwordErrors.map(it => it.field).join(',')
    })
  }

  const body = {
    password: await generatePassword(password)
  }

  try {
    await User.findByIdAndUpdate(id, body)
    return true
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

async function removeUser({ suid }, id) {
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
    await User.findOneAndDelete({ _id: id, church: suid })
    return true
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

module.exports = {
  getUsers,
  removeUser,
  updateUser,
  getUser,
  changePassword,
  createUser
}
