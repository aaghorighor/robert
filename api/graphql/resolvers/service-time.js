/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  addServiceTime,
  editServiceTime,
  deleteServiceTime,
  getServiceTimeById,
  getAllServiceTimes,
  fetchAllServiceTimes
} = require('../../services/serviceTime')

const resolvers = {
  Query: {
    getServiceTimeById: combineResolvers(
      isAuthenticated,
      (_, { serviceTimeId }) => getServiceTimeById(serviceTimeId)
    ),
    getAllServiceTimes: combineResolvers(isAuthenticated, (_, arg, { user }) =>
      getAllServiceTimes(user)),
    fetchAllServiceTimes: (_, { suid }) => fetchAllServiceTimes(suid)
  },
  Mutation: {
    addServiceTime: combineResolvers(
      isAuthenticated,
      (_, { serviceTimeInput }, { user }) =>
        addServiceTime(user, serviceTimeInput)
    ),
    editServiceTime: combineResolvers(
      isAuthenticated,
      (_, { serviceTimeId, serviceTimeInput }) =>
        editServiceTime(serviceTimeId, serviceTimeInput)
    ),
    deleteServiceTime: combineResolvers(
      isAuthenticated,
      (_, { serviceTimeId }) => deleteServiceTime(serviceTimeId)
    )
  }
}

module.exports = resolvers
