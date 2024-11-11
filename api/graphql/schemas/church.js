/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Address {
		addressLine1: String
		county: String
		town: String
		country: String!
		country_code: String
		postcode: String
		location: Location
	}

	type Location {
		type: String
		coordinates: [Float]
	}

	type Slider {
		title: String
		message: String
		status: Boolean
		imageOnly: Boolean
		secure_url: String
		public_id: String
	}

	type Church {
		_id: ID!
		name: String!
		email: String!
		mobile: String!
		address: Address
		currency: String
		secure_url: String
		public_id: String
		logo_url: String
		logo_id: String
		description: String
		stripe_user_id: String
		sliders: [Slider!]
		sort_code: String
		account_number: String
		bank_name: String
		reference: String
		features: [String!]
		prayer_request_email: String
		giving_url : String
		enable_url_giving: Boolean
		enable_bank_transfer :Boolean
		enable_app_giving :Boolean
	}

	type Query {
		getChurchesByCountryCode(countryCode: String!): [Church!]!
		getChurchesByName(churchName: String!): [Church!]!
		getChurchById(id: ID!): Church!
		searchChurches(searchTerm: String!): [Church!]!
		searchChurchesWithinRadius(
			latitude: Float!
			longitude: Float!
			radius: String!
		): [Church!]!
	}

	type Mutation {
		updateOneChurch(name: String!, value: String!): Boolean!
		deleteChurch(id: ID!): Boolean!
		updateFeatures(features: [String!]): Boolean!	
		updateChurchAddress(addressInput: AddressInput!): Boolean!
		updateChurchContact(
			name: String!
			email: String!
			mobile: String!
			secure_url: String
			public_id: String
			logo_url: String
			logo_id: String
		): Boolean!
		updateBulk(bulkInput: BulkInput): Boolean!
	}

	input BulkInput {
		currency: String
		tax_rate: Float
		isSearchable: Boolean
		sort_code: String
		account_number: String
		bank_name: String
		reference: String
		prayer_request_email :String
		giving_url :String,
		enable_url_giving: Boolean
		enable_bank_transfer :Boolean
		enable_app_giving :Boolean
	}

	input AddressInput {
		addressLine1: String
		county: String
		town: String
		country: String!
		postcode: String
		country_code: String
		location: LocationInput
		completeAddress: String
	}

	input LocationInput {
		type: String
		coordinates: [Float]
	}
`

module.exports = typeDefs
