const { AuthenticationError } = require('apollo-server-express');
const { skip } = require('graphql-resolvers');

const isAuthenticated = (parent, args, { user }) => (user?.userId || user?.email) ? skip : new AuthenticationError('Authentication fail');

module.exports = isAuthenticated;
