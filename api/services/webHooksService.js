/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
const { ApolloError } = require('apollo-server')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const dotenv = require('dotenv')
const { findPrice } = require('../configs/pricing')
const { formatUnix } = require('../util/date-format')
const {
  updateOne,
  cancelOne,
  invoicePaymentStatus,
  trialEnd, updateStatus
} = require('./subscriptionUpdateService')
const {
  Active,
  Suspended,
  Cancelled
} = require('../configs/subscription-status')
const {
  DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz,
  DATE_FORMAT_dd_MMM_YYYY
} = require('../configs/date-constants')
const { sendGridMail } = require('../lib/mail')
const { compileEmailTemplate } = require('../util/compile-email-template')
const { logger } = require('../util/logger')

dotenv.config()

exports.invoicePaymentSuccess = async event => {
  try {
    const {
      lines,
      hosted_invoice_url,
      amount_paid,
      period_end
    } = event.data.object

    if (!lines || !lines.data[0] || !lines.data[0].metadata) {
      throw new Error('Invalid invoice data')
    }

    const { contact, userName, suid } = lines.data[0].metadata
    const amountPaidInDollars = amount_paid * 0.01
    const periodEndFormatted = formatUnix(
      period_end,
      DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz
    )

    const html = await compileEmailTemplate({
      fileName: 'invoicePaymentSuccess.mjml',
      data: {
        hosted_invoice_url,
        email: userName,
        amount_paid: amountPaidInDollars,
        periodEnd: periodEndFormatted,
        contact,
        contactEmail: process.env.CONTACT_EMAIL,
        contactMobile: process.env.CONTACT_MOBILE,
        team: process.env.TEAM
      }
    })

    await invoicePaymentStatus(suid, Active)

    const mailOptions = {
      from: process.env.USER_NAME,
      to: userName,
      subject: 'Invoice paid Successfully',
      text: 'Invoice paid Successfully',
      html
    }

    sendGridMail(mailOptions)
  } catch (error) {
    const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
    logger.error(error)
    throw new ApolloError(errorMessage)
  }
}
exports.setDefaultPaymentMethod = async event => {
  try {
    if (event.data.object.billing_reason === 'subscription_create') {
      const subscription_id = event.data.object.subscription
      const payment_intent_id = event.data.object.payment_intent

      if (payment_intent_id != null) {
        const payment_intent = await stripe.paymentIntents.retrieve(
          payment_intent_id
        )
        await stripe.subscriptions.update(subscription_id, {
          default_payment_method: payment_intent.payment_method
        })
      }
    }
  } catch (error) {
    const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
    logger.error(error)
    throw new ApolloError(errorMessage)
  }
}
exports.invoicePaymentFailed = async event => {
  try {
    const { lines, hosted_invoice_url, period_end } = event.data.object
    if (!lines || !lines.data[0] || !lines.data[0].metadata) {
      throw new Error('Invalid invoice data')
    }

    const { contact, userName, suid } = lines.data[0].metadata

    const html = await compileEmailTemplate({
      fileName: 'invoicePaymentFailed.mjml',
      data: {
        hosted_invoice_url,
        period_end: formatUnix(period_end, DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz),
        contact,
        team: process.env.TEAM
      }
    })

    await invoicePaymentStatus(suid, Suspended)

    const mailOptions = {
      from: process.env.USER_NAME,
      to: `${userName}`,
      subject: 'Invoice Payment Failed',
      text: 'Invoice Payment Failed',
      html
    }

    sendGridMail(mailOptions)
  } catch (error) {
    const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
    logger.error(error)
    throw new ApolloError(errorMessage)
  }
}
exports.trialWillEnd = async event => {
  try {
    const { metadata, current_period_end } = event.data.object
    const { contact, userName } = metadata

    const html = await compileEmailTemplate({
      fileName: 'trialWillEnd.mjml',
      data: {
        periodEnd: formatUnix(
          current_period_end,
          DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz
        ),
        contact,
        team: process.env.TEAM
      }
    })

    const mailOptions = {
      from: process.env.USER_NAME,
      to: `${userName}`,
      subject: 'Trial Will Soon End',
      text: 'Trial Will Soon End',
      html
    }

    sendGridMail(mailOptions)
  } catch (error) {
    const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
    logger.error(error)
    throw new ApolloError(errorMessage)
  }
}
exports.trialEnd = async event => {
  try {
    const live = process.env.NODE_ENV === 'production'
    const { metadata, priceId } = event.data.object
    const { contact, userName } = metadata
    const { billingCycle } = findPrice(priceId, live)

    const html = await compileEmailTemplate({
      fileName: 'trialEnd.mjml',
      data: {
        contact,
        billingCycle,
        product: process.env.PRODUCT,
        team: process.env.TEAM
      }
    })

    const mailOptions = {
      from: process.env.USER_NAME,
      to: `${userName}`,
      subject: 'Trial End',
      text: 'Trial End',
      html
    }

    sendGridMail(mailOptions)
  } catch (error) {
    const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
    logger.error(error)
    throw new ApolloError(errorMessage)
  }
}

exports.updateStatus = async event => {
  try {
    const {
      metadata,      
      card,
    } = event.data.object
    const { suid } = metadata
    const status = card?.checks?.cvc_check === 'pass'     
   
    await updateStatus(
      suid,     
      status
    )
    
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    logger.error(error)
    throw new ApolloError(errorMessage)
  }
}

exports.updateSubscription = async event => {
  try {
    const live = process.env.NODE_ENV === 'production'
    const {
      metadata,
      plan,
      current_period_end,
      current_period_start,
      id,
      status,
      customer
    } = event.data.object
    const { userName, contact, suid } = metadata
    const { price, duration, billingCycle, planName } = findPrice(
      plan.id,
      live
    )

    const html = await compileEmailTemplate({
      fileName: 'updateSubscription.mjml',
      data: {
        contact,
        price,
        plan: planName,
        duration,
        billingCycle,
        contactEmail: process.env.CONTACT_EMAIL,
        contactMobile: process.env.CONTACT_MOBILE,
        product: process.env.PRODUCT,
        team: process.env.TEAM
      }
    })

    await updateOne(
      suid,
      customer,
      planName,
      formatUnix(current_period_start, DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz),
      formatUnix(current_period_end, DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz),
      plan?.id,
      status,
      id,
      customer
    )

    const mailOptions = {  
      from: process.env.USER_NAME,
      to: `${userName}`,
      subject: 'Subscription Update',
      text: 'Subscription Update',
      html
    }

    sendGridMail(mailOptions)
  } catch (error) {
    const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
    logger.error(error)
    throw new ApolloError(errorMessage)
  }
}

exports.createSubscription = async event => {
  try {
    const live = process.env.NODE_ENV === 'production'
    const { metadata, plan } = event.data.object
    const { name, userName, contact } = metadata
    const { price, duration, billingCycle, planName } = findPrice(
      plan.id,
      live
    )

    const html = await compileEmailTemplate({
      fileName: 'subscriptionWelcomeMessage.mjml',
      data: {
        name,
        userName,
        contact,
        price,
        plan: planName,
        duration,
        url: process.env.LOGIN_URL,
        billingCycle,
        contactEmail: process.env.CONTACT_EMAIL,
        team: process.env.TEAM
      }
    })

    const mailOptions = {
      from: process.env.USER_NAME,
      to: `${userName}`,
      subject: 'Welcome to Jerur',
      text: 'Welcome to Jerur',
      html
    }

    sendGridMail(mailOptions)
  } catch (error) {
    const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
    throw new ApolloError(errorMessage)
  }
}
exports.cancelSubscription = async event => {
  try {
    const {
      metadata,
      current_period_end,
      current_period_start
    } = event.data.object
    const { contact, userName, suid } = metadata

    const html = await compileEmailTemplate({
      fileName: 'cancelSubscription.mjml',
      data: {
        contact,
        periodEnd: formatUnix(
          current_period_end,
          DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz
        ),
        contactEmail: process.env.CONTACT_EMAIL,
        contactMobile: process.env.CONTACT_MOBILE,
        team: process.env.TEAM
      }
    })

    await cancelOne(
      suid,
      formatUnix(current_period_start, DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz),
      formatUnix(current_period_end, DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz),
      Cancelled
    )

    const mailOptions = {
      from: process.env.USER_NAME,
      to: `${userName}`,
      subject: 'Subscription Cancelled',
      text: 'Subscription Cancelled',
      html
    }

    sendGridMail(mailOptions)
  } catch (error) {
    const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
    logger.error(error)
    throw new ApolloError(errorMessage)
  }
}
exports.cancelTrial = async event => {
  try {
    const { metadata, current_period_end } = event.data.object
    const { contact, userName, suid } = metadata

    const html = await compileEmailTemplate({
      fileName: 'cancelTrial.mjml',
      data: {
        contact,
        periodEnd: formatUnix(current_period_end, DATE_FORMAT_dd_MMM_YYYY),
        contactEmail: process.env.CONTACT_EMAIL,
        contactMobile: process.env.CONTACT_MOBILE,
        team: process.env.TEAM
      }
    })

    await trialEnd(suid, Cancelled)

    const mailOptions = {
      from: process.env.USER_NAME,
      to: `${userName}`,
      subject: 'Trial Cancelled',
      text: 'Trial Cancelled',
      html
    }

    sendGridMail(mailOptions)
  } catch (error) {
    const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
    logger.error(error)
    throw new ApolloError(errorMessage)
  }
}
