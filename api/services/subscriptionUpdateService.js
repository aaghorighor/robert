/* eslint-disable linebreak-style */
const { ApolloError } = require('apollo-server')
const { logger } = require('../util/logger')
const Church = require('../model/church')

exports.updateOne = async (
  id,
  stripe_user_id,
  plan,
  startDate,
  endDate,
  priceId,
  status,
  subscriptionId,
  stripeCustomerId
) => {
  const body = {
    stripe_user_id,
    plan,
    startDate,
    endDate,
    priceId,
    status,
    subscriptionId,
    stripeCustomerId
  }

  try {
    Church.findByIdAndUpdate(id, body).exec()
  } catch (error) {
    logger.error(error)
    throw new ApolloError(error.message)
  }
}

exports.cancelOne = async (id, startDate, endDate, status) => {
  try {
    const body = { startDate, endDate, status }
    await Church.findByIdAndUpdate(id, body).exec()
  } catch (error) {
    logger.error(error)
    throw new ApolloError(error.message)
  }
}

exports.invoicePaymentStatus = async (id, status) => {
  try {
    const body = { status }
    await Church.findByIdAndUpdate(id, body).exec()
  } catch (error) {
    logger.error(error)
    throw new ApolloError(error.message)
  }
}

exports.endOne = async (id, status) => {
  try {
    const body = { status }
    await Church.findByIdAndUpdate(id, body).exec()
  } catch (error) {
    throw new ApolloError(error.message)
  }
}

exports.updateStatus = async (id, status) => {
  try {
    const body = { status }
    await Church.findByIdAndUpdate(id, body).exec()
  } catch (error) {
    throw new ApolloError(error.message)
  }
}

exports.updateStripeConnect = async (id, res) => {
  try {
    const body = {
      key: res.stripe_publishable_key,
      secret: res.access_token,
      name: 'Stripe',
      active: true,
      access_token: res.access_token,
      refresh_token: res.refresh_token,
      scope: res.scope,
      token_type: res.token_type,
      livemode: res.livemode,
      stripe_user_id: res.stripe_user_id,
      stripe_publishable_key: res.stripe_publishable_key
    }
    await Church.findOneAndUpdate(
      { _id: id },
      { $push: { payment_provider: body } },
      { new: true }
    ).exec()
  } catch (error) {
    logger.error(error)
    throw new ApolloError(error.message)
  }
}

exports.updateFcmToken = async (id, fcm_token) => {
  try {
    if (fcm_token === '' || fcm_token === null) return
    const body = { fcm_token }
    await Church.findByIdAndUpdate(id, body).exec()
  } catch (error) {
    logger.error(error)
    throw new ApolloError(error.message)
  }
}
