/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  addEvent,
  editEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  countInEventCollection,
  getEvents,
  fetchEvents,
  fetchTop10Events
} = require('../../services/event')

const resolvers = {
  Query: {
    getEventById: combineResolvers(isAuthenticated, (_, { eventId }) =>
      getEventById(eventId)),
    getAllEvents: combineResolvers(isAuthenticated, (_, arg, { user }) =>
      getAllEvents(user)),
    countInEventCollection: combineResolvers(
      isAuthenticated,
      (_, arg, { user }) => countInEventCollection(user)
    ),
    getEvents: combineResolvers(
      isAuthenticated,
      (_, { pageNumber, pageSize, filterTerm }, { user }) =>
        getEvents(user, pageNumber, pageSize, filterTerm)
    ),
    fetchEvents: (_, { suid, pageNumber, pageSize, filterTerm }) =>
      fetchEvents(suid, pageNumber, pageSize, filterTerm),
    fetchTop10Events: (_, { suid }) => fetchTop10Events(suid)
  },
  Mutation: {
    addEvent: combineResolvers(isAuthenticated, (_, { eventInput }, { user }) =>
      addEvent(user, eventInput)),
    editEvent: combineResolvers(isAuthenticated, (_, { eventId, eventInput }) =>
      editEvent(eventId, eventInput)),
    deleteEvent: combineResolvers(isAuthenticated, (_, { eventId }) =>
      deleteEvent(eventId))
  }
}

module.exports = resolvers
