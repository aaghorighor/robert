const { UserInputError, ApolloError } = require('apollo-server')
const { sliderValidator } = require('../validation/sliderValidator')
const {
  identifierValidator,
  identifierValidators
} = require('../validation/identifierValidator')
const { logger } = require('../util/logger')
const { Church } = require('../model')

const addSlider = async ({ suid }, body) => {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = sliderValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const church = await Church.findByIdAndUpdate(
      suid,
      { $push: { sliders: body } },
      { new: true }
    );

    const newAgenda = church.sliders[church.sliders.length - 1]
    return newAgenda
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding slider')
  }
}

const updateSlider = async (sliderId, body, { suid }) => {
  const { title, status, message, secure_url, public_id, imageOnly } = body

  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = sliderValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    await Church.updateOne(
      { _id: suid, 'sliders._id': sliderId },
      {
        $set: {
          'sliders.$.message': message,
          'sliders.$.title': title,
          'sliders.$.status': status,
          'sliders.$.imageOnly': imageOnly,
          'sliders.$.secure_url': secure_url,
          'sliders.$.public_id': public_id
        }
      }
    ).exec()

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error updating slider')
  }
}

const removeSlider = async ({ suid }, sliderId) => {
  const identifierValidateResult = identifierValidators([
    { suid },
    { sliderId }
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
    await Church.findByIdAndUpdate(
      suid,
      { $pull: { sliders: { _id: sliderId } } },
      { new: true }
    ).exec()

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error deleting slider')
  }
}
const getFilteredAndSortedSliders = sliders =>
  sliders
    .filter(slider => slider.status === true)
    .sort((a, b) => b.createdAt - a.createdAt)
const fetchAllSliders = async suid => {
  const identifierValidationErrors = identifierValidator(suid)
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
    const church = await Church.findOne({ _id: suid })

    if (!church) {
      throw new UserInputError('Church not found')
    }

    const sliders = getFilteredAndSortedSliders(church.sliders)
    return sliders
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching sliders')
  }
}

const getAllSliders = async ({ suid }) => {
  const identifierValidationErrors = identifierValidator(suid)
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
    const church = await Church.findOne({ _id: suid })

    if (!church) {
      throw new UserInputError('Church not found')
    }

    const sliders = church.sliders.sort((a, b) => b.createdAt - a.createdAt)
    return sliders
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching sliders')
  }
}
module.exports = {
  addSlider,
  updateSlider,
  removeSlider,
  fetchAllSliders,
  getAllSliders
}
