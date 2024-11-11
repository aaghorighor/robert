/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')
const userSchema = require('./user')
const securitySchema = require('./security')
const serviceTimeSchema = require('./service-time')
const serviceTimeAgendaSchema = require('./service-time-agenda')
const eventSchema = require('./event')
const eventAgendaSchema = require('./event-agenda')
const campaignSchema = require('./campaign')
const campaignContributionSchema = require('./campaign-contribution')
const donationSchema = require('./donation')
const fellowshipSchema = require('./fellowship')
const churchSchema = require('./church')
const sliderSchema = require('./slider')
const contactSchema = require('./contact')
const eventRegisterSchema = require('./event-register')
const pushNotificationSchema = require('./push-notification')
const memberSchema = require('./member')
const testimonySchema = require('./testimonies')

const rootSchema = gql`
	scalar Date

	scalar JSON

	scalar Upload

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}
`

module.exports = [
  rootSchema,
  userSchema,
  securitySchema,
  serviceTimeSchema,
  serviceTimeAgendaSchema,
  eventSchema,
  eventAgendaSchema,
  campaignSchema,
  campaignContributionSchema,
  donationSchema,
  fellowshipSchema,
  churchSchema,
  sliderSchema,
  contactSchema,
  eventRegisterSchema,
  pushNotificationSchema,
  memberSchema,
  testimonySchema
]
