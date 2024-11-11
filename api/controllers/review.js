const { removeReview, addReview, getReviews } = require('../services/reviewService')

exports.getReviews = async (req, res) => {
  const reviews = await getReviews()
  return res.status(200).json(reviews)
}

exports.addReview = async (req, res) => {
  const result = await addReview(req.body)
  return res.status(200).json(result)
}

exports.removeReview = async (req, res) => {
  const events = await removeReview(req.params.id)
  return res.status(200).json(events)
}
