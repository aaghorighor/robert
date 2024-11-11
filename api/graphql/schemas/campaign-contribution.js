/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Contribution {
		_id: ID!
		amount: Float!
		first_name: String!
		last_name: String!
		email: String!
		campaignId: ID!
		createdAt: String!
		updatedAt: String!
	}

	input ContributionInput {
		amount: Float!
		first_name: String!
		last_name: String!
		email: String!
		campaignId: ID!
	}

	type Query {
		getContributionById(contributionId: ID!): Contribution
		getContributionsByUser(email: String!): [Contribution!]!
		getContributionsByCampaignId(campaignId: ID!): [Contribution!]!
	}

	type Mutation {
		addContribution(
			contributionInput: ContributionInput!
		): Contribution!
	}
`;

module.exports = typeDefs;
