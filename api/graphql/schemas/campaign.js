/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Campaign {
		_id: ID!
		suid: ID!
		title: String!
		description: String!
		target_amount: Float!
		current_amount_funded: Float!
		start_date: String!
		end_date: String!
		status: Boolean
		secure_url: String
		public_id: String
		createdAt: String!
		updatedAt: String!
	}

	input CampaignInput {
		title: String!
		description: String!
		target_amount: Float!
		start_date: String!
		end_date: String!
		status: Boolean
		secure_url: String
		public_id: String
		send_notification: Boolean
	}

	type PageInfo {
		pageNumber: Int!
		pageSize: Int!
		totalPages: Int!
	}

	type CampaignsPage {
		campaigns: [Campaign!]!
		pageInfo: PageInfo!
	}

	type Query {
		getCampaignById(campaignId: ID!): Campaign
		getAllCampaigns: [Campaign]
		filterCampaigns(term: String!): [Campaign]
		getTop10Campaigns: [Campaign]
		countInCampaignCollection: Int!
		getCampaigns(
			pageNumber: Int
			pageSize: Int
			filterTerm: String
		): CampaignsPage!
		fetchCampaigns(
			suid: ID!
			pageNumber: Int
			pageSize: Int
			filterTerm: String
		): CampaignsPage!
		fetchTop10Campaigns(suid: ID!): [Campaign]
	}

	type Mutation {
		addCampaign(campaignInput: CampaignInput!): Campaign!
		updateCampaign(campaignId: ID!, campaignInput: CampaignInput!): Boolean!
		deleteCampaign(campaignId: ID!): Boolean!
	}
`

module.exports = typeDefs
