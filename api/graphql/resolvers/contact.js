const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  addContact,
  updateContact,
  removeContact,
  getAllContacts,
  fetchAllContacts
} = require('../../services/contactService')

const resolvers = {
  Query: {
    getAllContacts: combineResolvers(isAuthenticated, (_, arg, { user }) =>
      getAllContacts(user)),
    fetchAllContacts: (_, { suid }) => fetchAllContacts(suid)
  },
  Mutation: {
    addContact: combineResolvers(
      isAuthenticated,
      (_, { contactItemInput }, { user }) => addContact(user, contactItemInput)
    ),
    updateContact: combineResolvers(
      isAuthenticated,
      (_, { contactId, contactItemInput }, { user }) =>
        updateContact(contactId, contactItemInput, user)
    ),
    removeContact: combineResolvers(
      isAuthenticated,
      (_, { contactId }, { user }) => removeContact(user, contactId)
    )
  }
}

module.exports = resolvers
