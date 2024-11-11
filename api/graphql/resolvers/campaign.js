/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  deleteCampaign,
  updateCampaign,
  addCampaign,
  getCampaignById,
  getAllCampaigns,
  countInCampaignCollection,
  getTop10Campaigns,
  getCampaigns,
  fetchCampaigns,
  fetchTop10Campaigns
} = require('../../services/campaignService')

const resolvers = {
  Query: {
    getCampaignById: combineResolvers(isAuthenticated, (_, { campaignId }) =>
      getCampaignById(campaignId)),
    getAllCampaigns: combineResolvers(isAuthenticated, (_, arg, { user }) =>
      getAllCampaigns(user)),
    getTop10Campaigns: combineResolvers(isAuthenticated, (_, arg, { user }) =>
      getTop10Campaigns(user)),
    countInCampaignCollection: combineResolvers(
      isAuthenticated,
      (_, arg, { user }) => countInCampaignCollection(user)
    ),
    getCampaigns: combineResolvers(
      isAuthenticated,
      (_, { pageNumber, pageSize, filterTerm }, { user }) =>
        getCampaigns(user, pageNumber, pageSize, filterTerm)
    ),
    fetchCampaigns: (_, { suid, pageNumber, pageSize, filterTerm }) =>
      fetchCampaigns(suid, pageNumber, pageSize, filterTerm),
    fetchTop10Campaigns: (_, { suid }) => fetchTop10Campaigns(suid)
  },
  Mutation: {
    addCampaign: combineResolvers(
      isAuthenticated,
      (_, { campaignInput }, { user }) => addCampaign(user, campaignInput)
    ),
    updateCampaign: combineResolvers(
      isAuthenticated,
      (_, { campaignId, campaignInput }) =>
        updateCampaign(campaignId, campaignInput)
    ),
    deleteCampaign: combineResolvers(isAuthenticated, (_, { campaignId }) =>
      deleteCampaign(campaignId))
  }
}

module.exports = resolvers
