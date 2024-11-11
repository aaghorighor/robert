/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
const {
  invoicePaymentSuccess,
  setDefaultPaymentMethod,
  invoicePaymentFailed,
  trialWillEnd,
  updateSubscription,
  createSubscription,
  cancelSubscription,
  updateStatus
} = require('../services/webHooksService')
const { logger } = require('../util/logger')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.webHooks = async (req, res) => {
  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    logger.error(err)
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    }
  }

  switch (event.type) {
    case 'customer.subscription.created':
      await createSubscription(event)
      break
    case 'customer.subscription.updated':
      await updateSubscription(event)
      break
    case 'customer.subscription.deleted':
      await cancelSubscription(event)
      break
    case 'invoice.payment_succeeded':
      await invoicePaymentSuccess(event)
      await setDefaultPaymentMethod(event)
      break
    case 'invoice.payment_failed':
      await invoicePaymentFailed(event)
      break
    case 'customer.source.updated':
      await updateStatus(event)
      break   
    case 'customer.subscription.trial_will_end':
      trialWillEnd(event)
      break
    default:
      break
  }
  return res.sendStatus(200)
}
