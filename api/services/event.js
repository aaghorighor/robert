const { UserInputError, ApolloError } = require('apollo-server')
const { Event } = require('../model')
const { identifierValidator } = require('../validation/identifierValidator')
const { eventValidator } = require('../validation/eventValidator')
const { logger } = require('../util/logger')

async function addEvent({ suid }, body) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = eventValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const newEvent = new Event({
      suid,
      ...body
    })

    const savedEvent = await newEvent.save()
    return savedEvent
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding event')
  }
}

async function editEvent(id, body) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = eventValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    await Event.findByIdAndUpdate(id, body, {
      new: true
    })
    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error editing events')
  }
}

async function deleteEvent(id) {
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
    await Event.findByIdAndRemove(id)
    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error deleting events')
  }
}

async function getEventById(id) {
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
    const event = await Event.findById(id)
    return event
  } catch (error) {
    throw new ApolloError('Error fetching event')
  }
}

async function getAllEvents({ suid }) {
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
    const events = await Event.find({ suid })
    return events
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching all events')
  }
}

async function countInEventCollection({ suid }) {
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
    const eventCount = await Event.countDocuments({
      suid
    })
    return eventCount
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching event count')
  }
}

async function getEvents({ suid }, pageNumber, pageSize, filterTerm) {
  const page = parseFloat(pageNumber, 10) || 1
  const size = parseFloat(pageSize, 10) || 1
  const skipCount = (page - 1) * size

  const baseConditions = { suid }

  let filterConditions = []
  if (filterTerm) {
    filterConditions = [{ title: new RegExp(filterTerm, 'i') }]

    if (filterTerm === 'YES' || filterTerm === 'yes') {
      filterConditions.push({ status: true })
    }

    if (filterTerm === 'NO' || filterTerm === 'no') {
      filterConditions.push({ status: false })
    }
  }

  const queryConditions = filterTerm ?
    {
      $and: [baseConditions, { $or: filterConditions }]
    } :
    baseConditions

  try {
    const countQuery = Event.countDocuments(queryConditions)
    const totalEventsCount = await countQuery
    const events = await Event.find(queryConditions)
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(size)

    return {
      pageInfo: {
        pageNumber,
        pageSize,
        totalPages: Math.ceil(totalEventsCount / pageSize)
      },
      events
    }
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching events')
  }
}

async function fetchEvents(suid, pageNumber, pageSize, filterTerm) {
  const page = parseFloat(pageNumber, 10) || 1
  const size = parseFloat(pageSize, 10) || 1
  const skipCount = (page - 1) * size

  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  const baseConditions = {
    suid,
    status: true,
    end_date: { $gte: currentDate }
  }

  let filterConditions = []
  if (filterTerm) {
    filterConditions = [{ title: new RegExp(filterTerm, 'i') }]
  }

  const queryConditions = filterTerm ?
    {
      $and: [baseConditions, { $or: filterConditions }]
    } :
    baseConditions

  try {
    const countQuery = Event.countDocuments(queryConditions)
    const totalEventsCount = await countQuery
    const events = await Event.find(queryConditions)
      .sort({ start_date: -1 })
      .skip(skipCount)
      .limit(size)

    return {
      pageInfo: {
        pageNumber,
        pageSize,
        totalPages: Math.ceil(totalEventsCount / pageSize)
      },
      events
    }
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching events')
  }
}

async function fetchTop10Events(suid) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  try {
    const campaigns = await Event.find({
      suid,
      status: true,
      end_date: { $gte: currentDate }
    })
      .sort({
        start_date: -1
      })
      .limit(10)
    return campaigns
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching all events')
  }
}

module.exports = {
  addEvent,
  editEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  countInEventCollection,
  getEvents,
  fetchEvents,
  fetchTop10Events
}
