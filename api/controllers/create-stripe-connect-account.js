const { logger } = require('../util/logger')
const Church = require('../model/church')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.stripeOnBoarding = async (req, res) => {
  try {
    const { stripe_user_id } = req.body
    const baseURL = process.env.STRIPE_CONNECT_RETURN_URL
    const encodedStripeUserID = encodeURIComponent(stripe_user_id)

    const accountLink = await stripe.accountLinks.create({
      account: stripe_user_id,
      refresh_url: process.env.STRIPE_CONNECT_REFRESH_URL,
      return_url: `${baseURL}${encodedStripeUserID}`,
      type: 'account_onboarding'
    })

    return res.status(200).json({ url: accountLink.url })
  } catch (err) {
    logger.error(err)
  }
}

exports.stripeOnBoardingCompleted = async (req, res) => {
  const successRedirectURL = process.env.STRIPE_CONNECT_SUCCESS
  const failRedirectURL = process.env.STRIPE_CONNECT_FAIL

  try {
    const { stripe_user_id } = req.params

    if (!stripe_user_id) {
      console.error('Stripe user ID is required')
      return res.redirect(failRedirectURL)
    }

    const account = await stripe.account.retrieve(stripe_user_id)

    if (account.details_submitted) {
      Church.findOneAndUpdate(
        { stripe_user_id },
        { onboardingComplete: true }
      ).exec()
      return res.redirect(successRedirectURL)
    }

    return res.redirect(failRedirectURL)
  } catch (err) {
    logger.error(err)
    return res.redirect(failRedirectURL)
  }
}

exports.stripeDashboard = async (req, res) => {
  try {
    const { stripe_user_id } = req.body
    const baseURL = process.env.STRIPE_CONNECT_RETURN_URL
    const encodedStripeUserID = encodeURIComponent(stripe_user_id)

    const loginLink = await stripe.accounts.createLoginLink(stripe_user_id, {
      redirect_url: `${baseURL}${encodedStripeUserID}`
    })

    return res.status(200).json({ url: loginLink.url })
  } catch (err) {
    logger.error(err)
  }
}
