/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers');
const isAuthenticated = require('./isAuthenticated');
const {
  addContribution,
  getContributionsByUser,
  getContributionById,
} = require('../../services/campaignContributionService');

const resolvers = {
  Query: {
    getContributionById: combineResolvers(
      isAuthenticated,
      (_, { contributionId }) => getContributionById(contributionId),
    ),
    getContributionsByUser: combineResolvers(
      isAuthenticated,
      (_, { email }, { user }) => getContributionsByUser(user, email),
    ),
  },
  Mutation: {
    addContribution: combineResolvers(
      isAuthenticated,
      (_, { contributionInput }, { user }) =>
        addContribution(user, contributionInput),
    ),
  },
};

module.exports = resolvers;
