const express = require('express')

const router = express.Router()

const {
  createSetupIntents,
  chargeCustomer,
  chargeCustomerGiving
} = require('../controllers/stripe-setup-Intents')

const {
  stripePaymentIntentValidator
} = require('../validation/stripe-payment-intent-validator')

router.post(
  '/stripe-setup-Intent',
  stripePaymentIntentValidator,
  createSetupIntents
)

router.post(
  '/stripe-charge-customer-campaign',
  stripePaymentIntentValidator,
  chargeCustomer
)

router.post(
  '/stripe-charge-customer-giving',
  stripePaymentIntentValidator,
  chargeCustomerGiving
)

module.exports = router
