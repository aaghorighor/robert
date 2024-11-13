/* eslint-disable linebreak-style */
const express = require('express')

const router = express.Router()

const {
  getReviews,
  addReview,
  removeReview,  
  getReviewStats 
} = require('../controllers/review')

router.get(
  '/reviews', 
  getReviews
)

router.get(
  '/review-stats',
  getReviewStats
)

router.post(
  '/add-review',
  addReview
)

router.delete(
  '/remove-review/:id',
  removeReview
)

module.exports = router
