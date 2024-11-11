/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  getChurchById,
  getChurchesByName,
  getChurchesByCountryCode,
  updateChurchAddress,
  updateChurchContact,
  deleteChurch,
  updateBulk,
  updateOneChurch,
  searchChurches,
  searchChurchesWithinRadius,
  updateFeatures
} = require('../../services/churchService')

const resolvers = {
  Query: {
    getChurchById: combineResolvers(isAuthenticated, (_, { churchId }) =>
      getChurchById(churchId)),
    getChurchesByName: combineResolvers(isAuthenticated, (_, { churchName }) =>
      getChurchesByName(churchName)),
    getChurchesByCountryCode: combineResolvers(
      isAuthenticated,
      (_, { countryCode }) => getChurchesByCountryCode(countryCode)
    ),
    searchChurches: (_, { searchTerm }) => searchChurches(searchTerm),
    searchChurchesWithinRadius: (_, { latitude, longitude, radius }) =>
      searchChurchesWithinRadius(latitude, longitude, radius)
  },
  Mutation: {
    updateOneChurch: combineResolvers(
      isAuthenticated,
      (_, { name, value }, { user }) => updateOneChurch(user, name, value)
    ),
    updateChurchAddress: combineResolvers(
      isAuthenticated,
      (_, { addressInput }, { user }) =>
        updateChurchAddress(user, addressInput)
    ),
    updateChurchContact: combineResolvers(
      isAuthenticated,
      (_, { name, email, mobile, secure_url, public_id, logo_url, logo_id }, { user }) =>
        updateChurchContact(user, {
          name,
          email,
          mobile,
          secure_url,
          public_id,
          logo_url,
          logo_id
        })
    ),
    deleteChurch: combineResolvers(isAuthenticated, (_, { churchId }) =>
      deleteChurch(churchId)),
    updateBulk: combineResolvers(
      isAuthenticated,
      (_, { bulkInput }, { user }) => updateBulk(user, bulkInput)
    ),
    updateFeatures: combineResolvers(
      isAuthenticated,
      (_, { features }, { user }) => updateFeatures(user, features)
    ),
  }
}

module.exports = resolvers
