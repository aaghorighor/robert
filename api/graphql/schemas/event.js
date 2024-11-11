const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Address {
		addressLine1: String
		county: String
		town: String
		country: String!
		postcode: String
		location: Location
	}

	type Location {
		type: String
		coordinates: [Float]
	}

	type Event {
		_id: ID!
		suid: ID!
		title: String!
		start_time: String!
		end_time: String!
		start_date: String!
		end_date: String!
		secure_url: String
		public_id: String
		description: String
		addressLine1: String
		county: String
		town: String
		country: String
		postcode: String
		completeAddress: String
		location: Location
		status: Boolean
		can_register: Boolean
		agenda: [AgendaItem]
		register: [EventRegister]
		createdAt: String!
	}

	type EventRegister {
		_id: ID!
		first_name: String
		last_name: String
		mobile: String
		email: String
	}

	type Location {
		type: String
		coordinates: [Float]
	}

	type AgendaItem {
		title: String!
		start_time: String!
		end_time: String!
		description: String
		status: Boolean
		facilitator: String
	}

	input EventInput {
		title: String!
		start_time: String!
		end_time: String!
		start_date: String!
		end_date: String!
		description: String
		secure_url: String
		public_id: String
		status: Boolean
		can_register: Boolean
		addressLine1: String
		county: String
		town: String
		country: String
		postcode: String
		completeAddress: String
		location: LocationInput
		send_notification: Boolean
	}

	input LocationInput {
		type: String
		coordinates: [Float]
	}

	type PageInfo {
		pageNumber: Int!
		pageSize: Int!
		totalPages: Int!
	}

	type EventsPage {
		events: [Event!]!
		pageInfo: PageInfo!
	}

	type Query {
		getEventById(eventId: ID!): Event
		getAllEvents: [Event]
		countInEventCollection: Int!
		getEvents(pageNumber: Int, pageSize: Int, filterTerm: String): EventsPage!
		fetchEvents(
			suid: ID!
			pageNumber: Int
			pageSize: Int
			filterTerm: String
		): EventsPage!
		fetchTop10Events(suid: ID!): [Event]
	}

	type Mutation {
		addEvent(eventInput: EventInput): Event
		editEvent(eventId: ID!, eventInput: EventInput): Boolean!
		deleteEvent(eventId: ID!): Boolean!
	}
`

module.exports = typeDefs
