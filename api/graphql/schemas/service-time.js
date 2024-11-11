/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type ServiceTime {
		_id: ID!
		suid: ID!
		title: String!
		start_time: String!
		end_time: String!
		description: String
		status: Boolean
		remote_link: String
		remote: Boolean
		sequency_no: Int
		agenda: [AgendaItem]
		createdAt: String!
	}

	type AgendaItem {
		title: String!
		start_time: String!
		end_time: String!
		description: String
		status: Boolean
		facilitator: String
	}

	input ServiceTimeInput {
		title: String!
		start_time: String!
		end_time: String!
		description: String
		status: Boolean
		remote_link: String
		remote: Boolean
		sequency_no: Int
	}

	type Query {
		getServiceTimeById(serviceTimeId: ID!): ServiceTime
		getAllServiceTimes: [ServiceTime]
		fetchAllServiceTimes(suid: ID!): [ServiceTime]
	}

	type Mutation {
		addServiceTime(serviceTimeInput: ServiceTimeInput): ServiceTime
		editServiceTime(
			serviceTimeId: ID!
			serviceTimeInput: ServiceTimeInput
		): Boolean!
		deleteServiceTime(serviceTimeId: ID!): Boolean!
	}
`

module.exports = typeDefs
