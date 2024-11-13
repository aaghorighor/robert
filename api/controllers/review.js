const { removeReview, addReview, getReviews, getReviewStats } = require('../services/reviewService')

exports.getReviews = async (req, res) => {
  const reviews = await getReviews()
  return res.status(200).json(reviews)
}

exports.addReview = async (req, res) => {
  const result = await addReview(req.body)
  return res.status(200).json(result)
}

exports.removeReview = async (req, res) => {
  const result = await removeReview(req.params.id)
  return res.status(200).json(result)
}

exports.getReviewStats = async (req, res) => {
  const reviews = await getReviewStats()
  return res.status(200).json(reviews)
}
