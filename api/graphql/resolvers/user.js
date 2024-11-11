const { combineResolvers } = require('graphql-resolvers')
const {
  removeUser,
  updateUser,
  getUser,
  getUsers,
  changePassword,
  createUser
} = require('../../services/userService')
const isAuthenticated = require('./isAuthenticated')

const resolvers = {
  Query: {
    getUser: combineResolvers(isAuthenticated, (_, { id }) => getUser(id)),
    getUsers: combineResolvers(isAuthenticated, (_, args, { user }) =>
      getUsers(user)),
    me: combineResolvers(isAuthenticated, (_, args, { user }) => user)
  },
  Mutation: {
    updateUser: combineResolvers(
      isAuthenticated,
      (
        _,
        {
          _id,
          email,
          first_name,
          last_name,
          mobile,
          user_status,
          role,
          password
        },
        { user }
      ) =>
        updateUser(user, {
          _id,
          email,
          first_name,
          last_name,
          mobile,
          role,
          user_status,
          password
        })
    ),
    createUser: combineResolvers(
      isAuthenticated,
      (
        _,
        { email, first_name, last_name, mobile, user_status, role, password },
        { user }
      ) =>
        createUser(user, {
          email,
          first_name,
          last_name,
          mobile,
          user_status,
          role,
          password
        })
    ),
    changePassword: combineResolvers(
      isAuthenticated,
      (_, { password }, { user }) => changePassword(user, password)
    ),
    removeUser: combineResolvers(isAuthenticated, (_, { id }, { user }) =>
      removeUser(user, id))
  }
}

module.exports = resolvers
