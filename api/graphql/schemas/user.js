/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	scalar Upload

	type Query {
		getUsers: [User!]
		getUser(id: ID!): User
		me: User
	}

	type Mutation {
		createUser(
			first_name: String!
			last_name: String!
			mobile: String!
			email: String!
			role: String
			password: String
			user_status: Boolean
		): User
		updateUser(
			_id: ID!
			first_name: String!
			last_name: String!
			mobile: String!
			email: String!
			role: String
			password: String
			change_password: Boolean
			user_status: Boolean
		): Boolean
		changePassword(password: String!): Boolean
		removeUser(id: ID!): Boolean!
	}

	type User {
		_id: ID!
		first_name: String!
		last_name: String!
		mobile: String
		email: String!
		role: String!
		user_status: Boolean!
	}

	type photo {
		secure_url: String
		public_id: String
	}
`

module.exports = typeDefs
