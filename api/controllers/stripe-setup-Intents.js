/* eslint-disable indent */
const { addDonation } = require('../services/donationService')
const { addContribution } = require('../services/campaignContributionService')
const { checkAmount } = require('../util/helper')
const { logger } = require('../util/logger')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.createSetupIntents = async (req, res) => {
	try {
		const { stripe_user_id } = req.body
		const customer = await stripe.customers.create({
			stripeAccount: stripe_user_id
		})

		const ephemeralKey = await stripe.ephemeralKeys.create(
			{ customer: customer.id },
			{ apiVersion: '2020-08-27', stripeAccount: stripe_user_id }
		)

		const setupIntent = await stripe.setupIntents.create(
			{
				customer: customer.id,
				automatic_payment_methods: {
					enabled: true
				}
			},
			{
				stripeAccount: stripe_user_id
			}
		)

		res.json({
			setupIntent: setupIntent.client_secret,
			ephemeralKey: ephemeralKey.secret,
			stripeCustomerId: customer.id,
			publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
			status: true
		})
	} catch (error) {
		logger.error(logger)
		res.json({
			status: false
		})
	}
}

exports.chargeCustomer = async (req, res) => {
	try {
		const {
			currency,
			stripe_customer_id,
			amount,
			stripe_user_id,
			campaign_id,		
		} = req.body

		const amountValidateResult = checkAmount(amount)

		if (!amountValidateResult) {
			return res.status(400).json({
				error: 'Bad Request, In valid amount'
			})
		}

		const paymentMethods = await stripe.paymentMethods.list(
			{
				customer: stripe_customer_id,
				type: 'card'
			},
			{
				stripeAccount: stripe_user_id
			}
		)

		if (!paymentMethods.data.length) {
			return res.status(400).json({
				error: 'No payment methods found for the given customer.'
			})
		}

		await stripe.paymentIntents.create(
			{
				amount: Math.round(parseFloat(amount) * 100),
				currency,
				automatic_payment_methods: { enabled: true },
				customer: stripe_customer_id,
				payment_method: paymentMethods.data[0].id,
				off_session: true,
				confirm: true
			},
			{ stripeAccount: stripe_user_id }
		)

		const body = {
			amount,
			campaign: campaign_id,
			first_name: req.body?.first_name || 'Guest',
			last_name: req.body?.last_name || 'Guest',
			email: req.body?.email || 'Guest'			
		}

		await addContribution(body)

		res.json({
			status: true
		})
	} catch (error) {
		logger.error(logger)
		res.json({
			status: false
		})
	}
}

exports.chargeCustomerGiving = async (req, res) => {
	try {
		
		const {
			currency,
			stripe_customer_id,
			amount,
			stripe_user_id,
			church_id,
			donation_type
		} = req.body

		const amountValidateResult = checkAmount(amount)

		if (!amountValidateResult) {
			return res.status(400).json({
				error: 'Bad Request, In valid amount'
			})
		}

		const paymentMethods = await stripe.paymentMethods.list(
			{
				customer: stripe_customer_id,
				type: 'card'
			},
			{
				stripeAccount: stripe_user_id
			}
		)

		if (!paymentMethods.data.length) {
			return res.status(400).json({
				error: 'No payment methods found for the given customer.'
			})
		}

		await stripe.paymentIntents.create(
			{
				amount: Math.round(parseFloat(amount) * 100),
				currency,
				automatic_payment_methods: { enabled: true },
				customer: stripe_customer_id,
				payment_method: paymentMethods.data[0].id,
				off_session: true,
				confirm: true
			},
			{ stripeAccount: stripe_user_id }
		)

		const body = {
			amount,
			suid: church_id,
			first_name: req.body?.first_name || 'Guest',
			last_name: req.body?.last_name || 'Guest',
			email: req.body?.email || 'Guest',
			date_donated: req.body?.date_donated || new Date(),
			online: true,
			donation_type
		}

		await addDonation(body, body)

		res.json({
			status: true
		})
	} catch (error) {
		logger.error(logger)	
		res.json({
			status: false
		})
	}
}
