/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  addEventRegister,
  getEventRegisterById
} = require('../../services/eventRegister')

const resolvers = {
  Query: {
    getEventRegisterById: combineResolvers(isAuthenticated, (_, { eventId }) =>
      getEventRegisterById(eventId))
  },
  Mutation: {
    addEventRegister: combineResolvers(
      isAuthenticated,
      (_, { eventRegisterInput }, { user }) =>
        addEventRegister(user, eventRegisterInput)
    )
  }
}

module.exports = resolvers
