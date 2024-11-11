const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type SliderItem {
		_id: ID!
		title: String!
		message: String!
		status: Boolean
		imageOnly: Boolean
		secure_url: String
		public_id: String
		createdAt: String
	}

	input SliderItemInput {
		title: String!
		message: String!
		status: Boolean
		imageOnly: Boolean
		secure_url: String
		public_id: String
	}

	type Query {
		getAllSliders: [SliderItem]
		fetchAllSliders(suid: ID!): [SliderItem]
	}

	type Mutation {
		addSlider(sliderItemInput: SliderItemInput): SliderItem
		updateSlider(sliderId: ID!, sliderItemInput: SliderItemInput): Boolean!
		removeSlider(sliderId: ID!): Boolean!
	}
`

module.exports = typeDefs
