const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  addServiceTimeAgenda,
  updateServiceTimeAgenda,
  removeServiceTimeAgenda,
  getServiceTimeAgendasById
} = require('../../services/serviceTimeAgenda')

const resolvers = {
  Query: {
    getServiceTimeAgendasById: combineResolvers(
      isAuthenticated,
      (_, { serviceTimeId }) => getServiceTimeAgendasById(serviceTimeId)
    )
  },
  Mutation: {
    addServiceTimeAgenda: combineResolvers(
      isAuthenticated,
      (_, { agendaItemInput }, { user }) =>
        addServiceTimeAgenda(user, agendaItemInput)
    ),
    updateServiceTimeAgenda: combineResolvers(
      isAuthenticated,
      (_, { agendaId, agendaItemInput }) =>
        updateServiceTimeAgenda(agendaId, agendaItemInput)
    ),
    removeServiceTimeAgenda: combineResolvers(
      isAuthenticated,
      (_, { agendaId, serviceTimeId }) =>
        removeServiceTimeAgenda(agendaId, serviceTimeId)
    )
  }
}

module.exports = resolvers
