/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  deleteDonation,
  updateDonation,
  addDonation,
  getDonationById,
  getAllDonations,
  getDonationByMonthlyAggregates,
  getByDonationTypeAggregates,
  getDonations,
  filterDonationsByDate,
  getDonationByDailyAggregates
} = require('../../services/donationService')

const resolvers = {
  Query: {
    getDonationById: combineResolvers(isAuthenticated, (_, { donationId }) =>
      getDonationById(donationId)),
    getAllDonations: combineResolvers(isAuthenticated, (_, arg, { user }) =>
      getAllDonations(user)),
    getDonationByDaily: combineResolvers(isAuthenticated, (_, arg, { user }) =>
      getDonationByDailyAggregates(user)),
    filterDonationsByDate: combineResolvers(
      isAuthenticated,
      (_, { startDateStr, endDateStr, donation_type }, { user }) =>
        filterDonationsByDate(user, startDateStr, endDateStr, donation_type)
    ),
    getDonationByMonthlyAggregates: combineResolvers(
      isAuthenticated,
      (_, arg, { user }) => getDonationByMonthlyAggregates(user)
    ),
    getByDonationTypeAggregates: combineResolvers(
      isAuthenticated,
      (_, arg, { user }) => getByDonationTypeAggregates(user)
    ),
    getDonations: combineResolvers(
      isAuthenticated,
      (_, { pageNumber, pageSize, filterTerm }, { user }) =>
        getDonations(user, pageNumber, pageSize, filterTerm)
    )
  },
  Mutation: {
    addDonation: combineResolvers(
      isAuthenticated,
      (_, { donationInput }, { user }) => addDonation(user, donationInput)
    ),
    updateDonation: combineResolvers(
      isAuthenticated,
      (_, { donationId, donationInput }) =>
        updateDonation(donationId, donationInput)
    ),
    deleteDonation: combineResolvers(isAuthenticated, (_, { donationId }) =>
      deleteDonation(donationId))
  }
}

module.exports = resolvers
