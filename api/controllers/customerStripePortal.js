/* eslint-disable linebreak-style */
const { logger } = require('../util/logger')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.createCustomerPortalSession = async (req, res) => {
  try {
    const { stripeCustomerId } = req.body
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: process.env.FRONTEND_URL
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    logger.error(err)
    return res.status(500).json({
      error: err
    })
  }
}
