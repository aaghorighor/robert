/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Mutation {
		createSubscription(subscriber: SubscriberInput!): Subscriber!
		login(email: String!): Boolean!
		signOn(email: String!, password: String!): SubscriberToken!
		forgotPassword(email: String!): Boolean!
		resetPassword(password: String!, token: String!): Boolean!
		verificationCode(code: String!, email: String!): Token!
		logout: Boolean!
	}

	type Token {
		token: String
		user: User!
	}

	type SubscriberToken {
		token: String
		user: SubscriberUser!
		aggregate: Aggregate
	}

	type User {
		id: ID!
		first_name: String!
		last_name: String!
		mobile: String!
		email: String!
		role: String!
	}

	type SubscriberUser {
		first_name: String!
		last_name: String!
		mobile: String!
		email: String!
		role: String!
		stripe_user_id: String
		stripeCustomerId: String
		userId: String!
		suid: String
		subscriptionId: String
		plan: String
		startDate: String
		endDate: String
		status: String
		church: Church
		description: String
		address: Address
		currency: String
		tax_rate: Float
		isSearchable: Boolean
		sort_code: String
		account_number: String
		bank_name: String
		reference: String
		features: [String!]
		prayer_request_email : String
		giving_url : String
		enable_url_giving: Boolean
		enable_bank_transfer :Boolean
		enable_app_giving :Boolean
		onboardingComplete: Boolean
	}

	type Church {
		email: String
		mobile: String
		name: String
		secure_url: String
		public_id: String
		description: String
	}

	type AggregateResults {
		count: Int
		status: String
	}

	type Aggregate {
		aggregateResults: [AggregateResults]
		totalAppointments: Int
	}

	type Subscriber {
		user: SubscriberUser!
		token: String
		clientSecret: String!
	}

	input SubscriberInput {
		first_name: String!
		last_name: String!
		mobile: String!
		email: String!
		password: String!
		address: AddressInput
		planId: String!
		nickname: String!
		church_name: String!
	}

	input AddressInput {
		addressLine1: String
		county: String
		town: String
		country: String!
		postcode: String
		country_code: String
	}

	type Address {
		addressLine1: String
		county: String
		town: String
		country: String!
		postcode: String
		country_code: String
		location: Location
	}

	type Location {
		type: String
		coordinates: [Float]
	}
`
module.exports = typeDefs
