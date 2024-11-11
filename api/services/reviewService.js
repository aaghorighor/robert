/* eslint-disable no-tabs */
const { ApolloError, UserInputError } = require('apollo-server')
const { reviewValidator } = require('../validation/reviewValidator')
const { identifierValidator } = require('../validation/identifierValidator')
const Review = require('../model/review')

function getReviews() {
 
  try {
    return Review.find({}).sort({ createdAt: -1 })
  } catch (error) {
    throw new ApolloError('An error occurred while getting doctors reviews.')
  }
}

async function addReview(body) {
  const validateResult = reviewValidator(body)
  if (validateResult.length) {
    throw new UserInputError(validateResult.map(it => it.message).join(','), {
      invalidArgs: validateResult.map(it => it.field).join(',')
    })
  }

  try {
    const review = new Review(body)
    await review.save()

    return review
  } catch (error) {
    throw new ApolloError('An error occurred while adding doctors reviews.')
  }
}

async function removeReview(id) {
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
    await Review.findByIdAndRemove(id)
    return true
  } catch (error) {
    throw new ApolloError('An error occurred while adding doctors reviews.')
  }
}

module.exports = {
  getReviews,
  addReview,
  removeReview
}
