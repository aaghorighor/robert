/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable no-return-await */
/* eslint-disable no-useless-catch */
const { combineResolvers } = require('graphql-resolvers')
const {
	createTestimony,
	getTestimonies,
	updateTestimonies,
	removeTestimony
} = require('../../services/testimoniesService')
const isAuthenticated = require('./isAuthenticated')

// Define resolvers
const resolvers = {
	Query: {
		getTestimonies: async (_, { suid }) => {
			return await getTestimonies(suid)
		}
	},
	Mutation: {
		createTestimony: async (_, { input }) => {			
			return await createTestimony(input)
		},
		updateTestimony: combineResolvers(isAuthenticated, async (_, { input }) => {
			return await updateTestimonies(input)
		}),
		removeTestimony: combineResolvers(
			isAuthenticated,
			async (_, { id }, { user }) => {
				return await removeTestimony(user, id)
			}
		)
	}
}

module.exports = resolvers
