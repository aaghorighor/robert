const { UserInputError, ApolloError } = require('apollo-server')
const { ServiceTime } = require('../model')
const { identifierValidator } = require('../validation/identifierValidator')
const { serviceTimeValidator } = require('../validation/serviceTimeValidator')
const { logger } = require('../util/logger')

async function addServiceTime({ suid }, body) {
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
    const newServiceTime = new ServiceTime({
      suid,
      ...body
    })

    const savedServiceTime = await newServiceTime.save()
    return savedServiceTime
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding service time')
  }
}

async function editServiceTime(id, body) {
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
    await ServiceTime.findByIdAndUpdate(id, body, {
      new: true
    })
    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error editing service time')
  }
}

async function deleteServiceTime(id) {
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
    await ServiceTime.findByIdAndRemove(id)
    return true
  } catch (error) {
    logger.error(error)
    throw new Error('Error deleting service time')
  }
}

async function getServiceTimeById(id) {
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
    const serviceTime = await ServiceTime.findById(id)
    return serviceTime
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching service time')
  }
}

async function getAllServiceTimes({ suid }) {
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
    const allServiceTimes = await ServiceTime.find({ suid })
    return allServiceTimes.sort((a, b) => a.sequency_no - b.sequency_no)
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error getting all service times')
  }
}

async function fetchAllServiceTimes(suid) {
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
    const allServiceTimes = await ServiceTime.find({ suid, status: true })
    return allServiceTimes.sort((a, b) => a.sequency_no - b.sequency_no)
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching all service times')
  }
}

module.exports = {
  addServiceTime,
  editServiceTime,
  deleteServiceTime,
  getServiceTimeById,
  getAllServiceTimes,
  fetchAllServiceTimes
}
