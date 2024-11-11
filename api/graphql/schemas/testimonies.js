/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Testimony {
		_id: ID!
		church: ID!
		first_name: String!
		last_name: String!
		description: String
		status: Boolean!
		createdAt: String!
	}

	input TestimonyInput {
		suid: ID!
		first_name: String!
		last_name: String!
		description: String
		status: Boolean
	}

	input TestimonyUpdateInput {
		_id: ID!
		suid: ID!
		first_name: String!
		last_name: String!
		description: String
		status: Boolean
	}

	type Query {
		getTestimonies(suid: ID!): [Testimony]
	}

	type Mutation {
		createTestimony(input: TestimonyInput!): Testimony
		updateTestimony(input: TestimonyUpdateInput!): Boolean
		removeTestimony(id: ID!): Boolean
	}
`

module.exports = typeDefs
