/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Fellowship {
		_id: ID!
		name: String!
		mobile: String!
		addressLine1: String
		county: String
		town: String
		country: String
		postcode: String
		completeAddress: String
		location: Location
		status: Boolean
		suid: ID!
		createdAt: String
		updatedAt: String
	}

	type Location {
		type: String
		coordinates: [Float]
	}

	type Query {
		getFellowshipById(fellowshipId: ID!): Fellowship
		getAllFellowships: [Fellowship]
		countInFellowshipCollection: Int!
		searchFellowshipWithinRadius(
			suid: ID!
			latitude: Float!
			longitude: Float!
			radius: String!
		): [Fellowship!]!
	}

	type Mutation {
		addFellowship(fellowshipInput: FellowshipInput!): Fellowship
		updateFellowship(
			fellowshipId: ID!
			fellowshipInput: FellowshipInput!
		): Boolean
		deleteFellowship(fellowshipId: ID!): Boolean
	}

	input FellowshipInput {
		name: String
		mobile: String
		addressLine1: String
		county: String
		town: String
		country: String
		postcode: String
		completeAddress: String
		location: LocationInput
		status: Boolean
	}

	input LocationInput {
		type: String
		coordinates: [Float]
	}
`

module.exports = typeDefs
