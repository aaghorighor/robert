const { UserInputError, ApolloError } = require('apollo-server')
const { identifierValidator } = require('../validation/identifierValidator')
const { logger } = require('../util/logger')
const { Event } = require('../model')

const addEventRegister = async ({ suid }, body) => {
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
    await Event.findOneAndUpdate(
      { _id: body.eventId },
      { $push: { register: body } },
      { new: true }
    ).exec()
    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding event agenda')
  }
}

const getEventRegisterById = async eventId => {
  const identifierValidationErrors = identifierValidator(eventId)
  if (identifierValidationErrors.length) {
    const errorMessages = identifierValidationErrors
      .map(err => err.message)
      .join(',')
    const invalidFields = identifierValidationErrors
      .map(err => err.field)
      .join(',')
    throw new UserInputError(errorMessages, { invalidArgs: invalidFields })
  }

  try {
    const event = await Event.findById(eventId)

    if (!event) {
      throw new UserInputError('Event not found')
    }

    const attendees = event.register.sort((a, b) => b.createdAt - a.createdAt)
    return attendees
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching event register')
  }
}

module.exports = {
  addEventRegister,
  getEventRegisterById
}
