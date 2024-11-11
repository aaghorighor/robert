/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  deleteFellowship,
  updateFellowship,
  addFellowship,
  getFellowshipById,
  getAllFellowships,
  countInFellowshipCollection,
  searchFellowshipWithinRadius
} = require('../../services/fellowshipService')

const resolvers = {
  Query: {
    getFellowshipById: combineResolvers(
      isAuthenticated,
      (_, { fellowshipId }) => getFellowshipById(fellowshipId)
    ),
    getAllFellowships: combineResolvers(isAuthenticated, (_, arg, { user }) =>
      getAllFellowships(user)),
    countInFellowshipCollection: combineResolvers(
      isAuthenticated,
      (_, arg, { user }) => countInFellowshipCollection(user)
    ),
    searchFellowshipWithinRadius: (_, { suid, latitude, longitude, radius }) =>
      searchFellowshipWithinRadius(suid, latitude, longitude, radius)
  },
  Mutation: {
    addFellowship: combineResolvers(
      isAuthenticated,
      (_, { fellowshipInput }, { user }) =>
        addFellowship(user, fellowshipInput)
    ),
    updateFellowship: combineResolvers(
      isAuthenticated,
      (_, { fellowshipId, fellowshipInput }) =>
        updateFellowship(fellowshipId, fellowshipInput)
    ),
    deleteFellowship: combineResolvers(isAuthenticated, (_, { fellowshipId }) =>
      deleteFellowship(fellowshipId))
  }
}

module.exports = resolvers
