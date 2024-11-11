const { UserInputError, ApolloError } = require('apollo-server')
const { eventAgendaValidator } = require('../validation/eventValidator')
const {
  identifierValidator,
  identifierValidators
} = require('../validation/identifierValidator')
const { logger } = require('../util/logger')
const { Event } = require('../model')

const addEventAgenda = async ({ suid }, body) => {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = eventAgendaValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const event = await Event.findOneAndUpdate(
      { _id: body.eventId },
      { $push: { agenda: body } },
      { new: true }
    ).exec()

    const newAgenda = event.agenda[event.agenda.length - 1]
    return newAgenda
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding event agenda')
  }
}

const updateEventAgenda = async (id, body) => {
  const {
    start_time,
    end_time,
    title,
    status,
    description,
    facilitator,
    sequency_no,
    eventId
  } = body

  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = eventAgendaValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    await Event.updateOne(
      { eventId, 'agenda._id': id },
      {
        $set: {
          'agenda.$.start_time': start_time,
          'agenda.$.end_time': end_time,
          'agenda.$.title': title,
          'agenda.$.status': status,
          'agenda.$.sequency_no': sequency_no,
          'agenda.$.facilitator': facilitator,
          'agenda.$.description': description
        }
      }
    ).exec()

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error updating event agenda')
  }
}

const removeEventAgenda = async (id, eventId) => {
  const identifierValidateResult = identifierValidators([{ id }, { eventId }])
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  try {
    await Event.findByIdAndUpdate(
      eventId,
      { $pull: { agenda: { _id: id } } },
      { new: true }
    ).exec()

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error deleting event agenda')
  }
}

const getEventAgendasById = async eventId => {
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

    const agendas = event.agenda.sort((a, b) => a.sequency_no - b.sequency_no)
    return agendas
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching agendas')
  }
}

module.exports = {
  addEventAgenda,
  updateEventAgenda,
  removeEventAgenda,
  getEventAgendasById
}
