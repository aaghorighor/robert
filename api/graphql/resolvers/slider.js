const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('./isAuthenticated')
const {
  addSlider,
  updateSlider,
  removeSlider,
  getAllSliders,
  fetchAllSliders
} = require('../../services/sliderService')

const resolvers = {
  Query: {
    getAllSliders: combineResolvers(isAuthenticated, (_, arg, { user }) =>
      getAllSliders(user)),
    fetchAllSliders: (_, { suid }) => fetchAllSliders(suid)
  },
  Mutation: {
    addSlider: combineResolvers(
      isAuthenticated,
      (_, { sliderItemInput }, { user }) => addSlider(user, sliderItemInput)
    ),
    updateSlider: combineResolvers(
      isAuthenticated,
      (_, { sliderId, sliderItemInput }, { user }) =>
        updateSlider(sliderId, sliderItemInput, user)
    ),
    removeSlider: combineResolvers(
      isAuthenticated,
      (_, { sliderId }, { user }) => removeSlider(user, sliderId)
    )
  }
}

module.exports = resolvers
