/* eslint-disable space-before-function-paren */
const { UserInputError, ApolloError } = require('apollo-server')
const { testimoniesValidator } = require('../validation/userValidator')
const { identifierValidator } = require('../validation/identifierValidator')
const Testimonies = require('../model/testimonies')
const { logger } = require('../util/logger')

function getTestimonies(suid) {
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
    return Testimonies.find({ church: suid }).sort({ createdAt: -1 }).limit(50)
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}
async function createTestimony(body) {
  
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

  const bodyErrors = testimoniesValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const newTestimony = await Testimonies.create({
      church: suid,
      ...body
    })

    if (!newTestimony) {
      throw new ApolloError('create new member failed')
    }

    return newTestimony
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}
async function updateTestimonies(body) {
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

  const bodyErrors = testimoniesValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const updatedTestimony = await Testimonies.findByIdAndUpdate(_id, body, {
      new: true
    })

    if (!updatedTestimony) {
      throw new ApolloError('Testimony not found or update failed')
    }

    return true
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}
async function removeTestimony({ suid }, id) {
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
    await Testimonies.findOneAndDelete({ _id: id, church: suid })
    return true
  } catch (error) {
    logger.error(error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

module.exports = {
  updateTestimonies,
  removeTestimony,
  createTestimony,
  getTestimonies
}
