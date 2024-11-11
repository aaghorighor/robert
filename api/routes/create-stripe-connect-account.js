/* eslint-disable linebreak-style */
const express = require('express')

const router = express.Router()

const {
  stripeOnBoarding,
  stripeOnBoardingCompleted,
  stripeDashboard
} = require('../controllers/create-stripe-connect-account')

router.post('/stripe-connect-dashboard', stripeDashboard)
router.post('/create-stripe-connect-account', stripeOnBoarding)
router.get(
  '/stripe-on-boarding-completed/:stripe_user_id',
  stripeOnBoardingCompleted
)
module.exports = router
