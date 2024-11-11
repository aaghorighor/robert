const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type PushNotificationItem {
		_id: ID!
		title: String!
		message: String!
		sentTime: String!
		message_type: String!
		status: Boolean
		createdAt: String
	}

	input PushNotificationInput {
		title: String!
		message: String!
		status: Boolean
		send_notification: Boolean
	}

	type Query {
		getAllPushNotifications: [PushNotificationItem]
		fetchAllPushNotifications(suid: ID!): [PushNotificationItem]
	}

	type Mutation {
		addPushNotification(
			pushNotificationInput: PushNotificationInput
		): PushNotificationItem
		updatePushNotification(
			notificationId: ID!
			pushNotificationInput: PushNotificationInput
		): Boolean!
		removePushNotification(notificationId: ID!): Boolean!
	}
`

module.exports = typeDefs
