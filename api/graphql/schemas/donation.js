/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Donation {
		_id: ID!
		suid: ID!
		donation_type: String!
		amount: Float!
		first_name: String
		last_name: String
		email: String
		online: Boolean!
		date_donated: String!
		createdAt: String!
	}

	input DonationInput {
		donation_type: String!
		amount: Float!
		first_name: String
		last_name: String
		email: String
		online: Boolean!
		date_donated: String!
	}

	type MonthlyDonationAggregated {
		_id: AggregationKey
		totalAmount: Int
	}

	type DonationByTypeAggregated {
		_id: AggregationKey
		totalAmount: Int
	}

	type AggregationKey {
		donation_type: String
		month: String
		year: Int
	}

	type PageInfo {
		pageNumber: Int!
		pageSize: Int!
		totalPages: Int!
	}

	type DonationsPage {
		donations: [Donation!]!
		pageInfo: PageInfo!
	}

	type FilteredDonations {
		donations: [Donation]!
		totalAmount: Float!
	}

	type DonationGroup {
		weekOfYear: String
		year: Int
		donations: [DonationTypeAmount!]!
	}

	type DonationTypeAmount {
		type: String
		totalAmount: Float
	}

	type Query {
		getDonationByDaily: [DonationGroup!]!
		getDonationById(donationId: ID!): Donation
		getAllDonations: [Donation]
		getDonationByMonthlyAggregates: [MonthlyDonationAggregated]
		getByDonationTypeAggregates: [DonationByTypeAggregated]
		getDonations(
			pageNumber: Int
			pageSize: Int
			filterTerm: String
		): DonationsPage!
		filterDonationsByDate(
			startDateStr: String!
			endDateStr: String!
			donation_type: String
		): FilteredDonations
	}

	type Mutation {
		addDonation(donationInput: DonationInput!): Donation!
		updateDonation(donationId: ID!, donationInput: DonationInput!): Boolean!
		deleteDonation(donationId: ID!): Boolean!
	}
`

module.exports = typeDefs
