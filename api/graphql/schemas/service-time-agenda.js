/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type AgendaItem {
		_id: ID!
		title: String!
		start_time: String!
		end_time: String!
		description: String
		status: Boolean
		sequency_no: Int
		facilitator: String
		serviceTimeId: String!
	}

	input AgendaItemInput {
		serviceTimeId: String!
		title: String!
		start_time: String!
		end_time: String!
		description: String
		status: Boolean
		sequency_no: Int
		facilitator: String
	}

	type Query {
		getServiceTimeAgendasById(serviceTimeId: ID!): [AgendaItem]
	}

	type Mutation {
		addServiceTimeAgenda(agendaItemInput: AgendaItemInput): AgendaItem
		updateServiceTimeAgenda(
			agendaId: ID!
			agendaItemInput: AgendaItemInput
		): Boolean!
		removeServiceTimeAgenda(agendaId: ID!, serviceTimeId: ID!): Boolean!
	}
`

module.exports = typeDefs
