/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
const { logger } = require('../util/logger')
const {
  updateStripeConnect
} = require('../services/subscriptionUpdateService')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const makeStripeConnectRequest = async code => {
  try {
    return await stripe.oauth.token({
      grant_type: 'authorization_code',
      code
    })
  } catch (error) {
    logger.error(error)
    throw new Error('Stripe Connect Request Failed')
  }
}

const connectAuthentication = async (req, res) => {
  try {
    const { code, state } = req.query

    if (!code || !state) {
      throw new Error('Missing authentication code or state')
    }

    const response = await makeStripeConnectRequest(code)
    await updateStripeConnect(state, response)
    const successRedirectURL = process.env.STRIPE_CONNECT_SUCCESS
    res.redirect(successRedirectURL)
  } catch (error) {
    logger.error(error)
    const failRedirectURL = process.env.STRIPE_CONNECT_FAIL
    res.redirect(failRedirectURL)
  }
}

exports.connectAuthentication = connectAuthentication
