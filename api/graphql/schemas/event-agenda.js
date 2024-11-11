/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type EventAgendaItem {
		_id: ID!
		title: String!
		start_time: String!
		end_time: String!
		description: String
		status: Boolean
		sequency_no: Int
		facilitator: String
	}

	input EventAgendaItemInput {
		eventId: String!
		title: String!
		start_time: String!
		end_time: String!
		description: String
		status: Boolean
		sequency_no: Int
		facilitator: String
	}

	type Query {
		getEventAgendasById(eventId: ID!): [EventAgendaItem]
	}

	type Mutation {
		addEventAgenda(eventAgendaItemInput: EventAgendaItemInput): EventAgendaItem
		updateEventAgenda(
			agendaId: ID!
			eventAgendaItemInput: EventAgendaItemInput
		): Boolean!
		removeEventAgenda(agendaId: ID!, eventId: ID!): Boolean!
	}
`

module.exports = typeDefs
