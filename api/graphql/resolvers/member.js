/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable no-return-await */
/* eslint-disable no-useless-catch */
const { combineResolvers } = require('graphql-resolvers')
const {
	createMember,
	getMembers,
	getMember,
	updateMember,
	removeMember,
	getMemberCount,
	verifyPin,
	verificationPin,
	createMemberManual
} = require('../../services/memberService')
const isAuthenticated = require('./isAuthenticated')

const resolvers = {
	Query: {
		getMembers: combineResolvers(isAuthenticated, async (_, arg, { user }) => {
			return await getMembers(user)
		}),
		getMember: combineResolvers(isAuthenticated, async (_, { id }) => {
			return await getMember(id)
		}),
		getMemberCount: combineResolvers(
			isAuthenticated,
			async (_, arg, { user }) => {
				return await getMemberCount(user)
			}
		)
	},

	Mutation: {
		createMember: combineResolvers(async (_, { input }) => {
			return await createMember(input)
		}),
		createMemberManual: combineResolvers(async (_, { input }) => {
			return await createMemberManual(input)
		}),
		updateMember: combineResolvers(isAuthenticated, async (_, { input }) => {
			return await updateMember(input)
		}),
		deleteMember: combineResolvers(
			isAuthenticated,
			async (_, { id }, { user }) => {
				return await removeMember(user, id)
			}
		),
		verifyPin: (_, { email }) => verifyPin({ email }),
		verificationPin: (_, { email, pin }) => verificationPin({ email, pin })
	}
}

module.exports = resolvers
