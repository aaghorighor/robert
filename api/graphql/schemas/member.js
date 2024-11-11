/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Query {
		getMember(id: ID!): Member
		getMembers: [Member]
		getMemberCount: MemberCount
	}

	type Mutation {
		createMember(input: CreateMemberInput!): LoginToken!
		createMemberManual(input: CreateMemberInput!): Member!
		updateMember(input: UpdateMemberInput!): Boolean
		deleteMember(id: ID!): Boolean
		verifyPin(email: String!): Boolean!
		verificationPin(email: String!, pin: Int): LoginToken!
	}

	type Member {
		_id: ID!
		church: String!
		first_name: String!
		last_name: String!
		mobile: String
		user_status: Boolean
		email: String!
		role: String
		createdAt: String
		updatedAt: String
	}

	type MemberCount {
		activeCount: Int
		noneActiveCount: Int
	}

	type LoginToken {
		token: String
		member: Member!
	}

	input CreateMemberInput {
		suid: ID!
		first_name: String!
		last_name: String!
		mobile: String
		user_status: Boolean
		email: String!
	}

	input UpdateMemberInput {
		_id: ID!
		first_name: String
		last_name: String
		mobile: String
		user_status: Boolean
		email: String
	}
`

module.exports = typeDefs
