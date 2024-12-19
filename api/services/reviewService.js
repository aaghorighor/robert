const { reviewValidator } = require('../validation/reviewValidator')
const { identifierValidator } = require('../validation/identifierValidator')
const Review = require('../model/review')

function getReviews() {
  try {
    return Review.find({}).sort({ createdAt: -1 })
  } catch (error) {
    throw new Error('An error occurred while getting doctors reviews.')
  }
}

async function addReview(body) {
  const validateResult = reviewValidator(body)
  if (validateResult.length) {
    throw new Error(validateResult.map(it => it.message).join(','), {
      invalidArgs: validateResult.map(it => it.field).join(',')
    })
  }

  try {
    const review = new Review(body)
    await review.save()

    return review
  } catch (error) {
    throw new Error('An error occurred while adding doctors reviews.')
  }
}

async function removeReview(id) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new Error(
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
    throw new Error('An error occurred while adding doctors reviews.')
  }
}

async function getReviewStats() {
  const stats = await Review.aggregate([
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        totalRating: { $sum: '$star' },
        averageRating: { $avg: '$star' }
      }
    }
  ])

  if (stats.length > 0) {
    const { totalReviews, totalRating, averageRating } = stats[0]
    return {
      totalReviews,
      totalRating,
      averageRating: parseFloat(averageRating.toFixed(1))
    }
  }

  return {
    totalReviews: 0,
    totalRating: 0,
    averageRating: 0
  }
}

module.exports = {
  getReviews,
  addReview,
  removeReview,
  getReviewStats
}
