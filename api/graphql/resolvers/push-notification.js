const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  addPushNotification,
  updatePushNotification,
  removePushNotification,
  getAllPushNotifications,
  fetchAllPushNotifications
} = require('../../services/pushNotificationService')

const resolvers = {
  Query: {
    getAllPushNotifications: combineResolvers(
      isAuthenticated,
      (_, arg, { user }) => getAllPushNotifications(user)
    ),
    fetchAllPushNotifications: (_, { suid }) => fetchAllPushNotifications(suid)
  },
  Mutation: {
    addPushNotification: combineResolvers(
      isAuthenticated,
      (_, { pushNotificationInput }, { user }) =>
        addPushNotification(user, pushNotificationInput)
    ),
    updatePushNotification: combineResolvers(
      isAuthenticated,
      (_, { notificationId, pushNotificationInput }, { user }) =>
        updatePushNotification(notificationId, pushNotificationInput, user)
    ),
    removePushNotification: combineResolvers(
      isAuthenticated,
      (_, { notificationId }, { user }) =>
        removePushNotification(user, notificationId)
    )
  }
}

module.exports = resolvers
