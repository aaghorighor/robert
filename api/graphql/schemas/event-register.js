/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type EventRegister {
		_id: ID!
		first_name: String
		last_name: String
		mobile: String
		email: String
	}

	input EventRegisterInput {
		eventId: String!
		first_name: String
		last_name: String
		mobile: String
		email: String
	}

	type Query {
		getEventRegisterById(eventId: ID!): [EventRegister]
	}

	type Mutation {
		addEventRegister(eventRegisterInput: EventRegisterInput): Boolean!
	}
`

module.exports = typeDefs
