const { UserInputError, ApolloError } = require('apollo-server')
const { Fellowship } = require('../model')
const { identifierValidator } = require('../validation/identifierValidator')
const { fellowshipValidator } = require('../validation/fellowshipValidator')
const { logger } = require('../util/logger')

async function addFellowship({ suid }, body) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = fellowshipValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const newFellowship = new Fellowship({
      suid,
      ...body
    })

    const savedFellowship = await newFellowship.save()
    return savedFellowship
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding fellowship')
  }
}

async function updateFellowship(id, body) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = fellowshipValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    await Fellowship.findByIdAndUpdate(id, body, {
      new: true
    })

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error editing fellowship')
  }
}

async function deleteFellowship(id) {
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
    await Fellowship.findByIdAndRemove(id)
    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error deleting fellowship')
  }
}

async function getFellowshipById(id) {
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
    const fellowship = await Fellowship.findById(id)
    return fellowship
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching fellowship')
  }
}

async function getAllFellowships({ suid }) {
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
    const allFellowships = await Fellowship.find({ suid }).sort({
      createdAt: -1
    })
    return allFellowships
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching all fellowship')
  }
}

async function countInFellowshipCollection({ suid }) {
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
    const fellowshipCount = await Fellowship.countDocuments({
      suid
    })
    return fellowshipCount
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching fellowship count')
  }
}

async function searchFellowshipWithinRadius(suid, latitude, longitude, radius) {
  try {
    const fellowships = await Fellowship.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseFloat(radius) * 1000
        }
      },
      status: true,
      suid
    }).limit(20)

    return fellowships
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error searching for fellowships')
  }
}

module.exports = {
  deleteFellowship,
  updateFellowship,
  addFellowship,
  getFellowshipById,
  getAllFellowships,
  countInFellowshipCollection,
  searchFellowshipWithinRadius
}
