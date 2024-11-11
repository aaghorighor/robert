const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type ContactItem {
		_id: ID!
		title: String!
		fullNames: String!
		phone: String!
		status: Boolean
		createdAt: String
	}

	input ContactItemInput {
		title: String!
		fullNames: String!
		phone: String!
		status: Boolean
	}

	type Query {
		getAllContacts: [ContactItem]
		fetchAllContacts(suid: ID!): [ContactItem]
	}

	type Mutation {
		addContact(contactItemInput: ContactItemInput): ContactItem
		updateContact(contactId: ID!, contactItemInput: ContactItemInput): Boolean!
		removeContact(contactId: ID!): Boolean!
	}
`

module.exports = typeDefs
