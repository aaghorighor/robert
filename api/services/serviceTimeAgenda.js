const { UserInputError, ApolloError } = require('apollo-server')
const { serviceTimeValidator } = require('../validation/serviceTimeValidator')
const {
  identifierValidator,
  identifierValidators
} = require('../validation/identifierValidator')
const { logger } = require('../util/logger')
const ServiceTime = require('../model/service-time')

const addServiceTimeAgenda = async ({ suid }, body) => {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = serviceTimeValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const serviceTime = await ServiceTime.findOneAndUpdate(
      { _id: body.serviceTimeId },
      { $push: { agenda: body } },
      { new: true }
    ).exec()

    const newAgenda = serviceTime.agenda[serviceTime.agenda.length - 1]
    return newAgenda
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding service time agenda')
  }
}

const updateServiceTimeAgenda = async (id, body) => {
  const {
    start_time,
    end_time,
    title,
    status,
    description,
    facilitator,
    sequency_no,
    serviceTimeId
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

  const bodyErrors = serviceTimeValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    await ServiceTime.updateOne(
      { serviceTimeId, 'agenda._id': id },
      {
        $set: {
          'agenda.$.start_time': start_time,
          'agenda.$.end_time': end_time,
          'agenda.$.title': title,
          'agenda.$.status': status,
          'agenda.$.facilitator': facilitator,
          'agenda.$.sequency_no': sequency_no,
          'agenda.$.description': description
        }
      }
    ).exec()

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error updating service time agenda')
  }
}

const removeServiceTimeAgenda = async (id, serviceTimeId) => {
  const identifierValidateResult = identifierValidators([
    { id },
    { serviceTimeId }
  ])
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  try {
    await ServiceTime.findByIdAndUpdate(
      serviceTimeId,
      { $pull: { agenda: { _id: id } } },
      { new: true }
    ).exec()

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error deleting service time agenda')
  }
}

const getServiceTimeAgendasById = async serviceTimeId => {
  console.log(serviceTimeId)
  const identifierValidationErrors = identifierValidator(serviceTimeId)
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
    const serviceTime = await ServiceTime.findById(serviceTimeId)
    if (!serviceTime) {
      throw new UserInputError('ServiceTime not found')
    }

    const agendas = serviceTime.agenda.sort(
      (a, b) => a.sequency_no - b.sequency_no
    )

    return agendas
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching serviceTime agendas')
  }
}

module.exports = {
  addServiceTimeAgenda,
  updateServiceTimeAgenda,
  removeServiceTimeAgenda,
  getServiceTimeAgendasById
}
