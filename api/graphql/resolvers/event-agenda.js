/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  addEventAgenda,
  updateEventAgenda,
  removeEventAgenda,
  getEventAgendasById
} = require('../../services/eventAgenda')

const resolvers = {
  Query: {
    getEventAgendasById: combineResolvers(isAuthenticated, (_, { eventId }) =>
      getEventAgendasById(eventId))
  },
  Mutation: {
    addEventAgenda: combineResolvers(
      isAuthenticated,
      (_, { eventAgendaItemInput }, { user }) =>
        addEventAgenda(user, eventAgendaItemInput)
    ),
    updateEventAgenda: combineResolvers(
      isAuthenticated,
      (_, { agendaId, eventAgendaItemInput }) =>
        updateEventAgenda(agendaId, eventAgendaItemInput)
    ),
    removeEventAgenda: combineResolvers(
      isAuthenticated,
      (_, { agendaId, eventId }) => removeEventAgenda(agendaId, eventId)
    )
  }
}

module.exports = resolvers
