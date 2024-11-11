/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable linebreak-style */
const faker = require('faker')
const { Types } = require('mongoose')
const { logger } = require('../util/logger')
const Church = require('../model/church')
const { generateKey } = require('../util/helper')

exports.ping = async (req, res) => {
  try {
		// console.log('started......')
		// const key = generateKey()
		// console.log(key)

		// const query = {} // Empty query matches all documents in the collection
		// const update = {
		//   $set: {
		//     stripe_user_id: '',
		//     onboardingComplete: false
		//   }
		// }
		// await Church.updateMany(query, update)
    // const body = {
    //   stripe_user_id: '',
    //   onboardingComplete: false
    // }
    // Church.findByIdAndUpdate({ _id: '65291c3089e7fee504e208a1' }, body).exec()
    res.json(new Date())
  } catch (err) {
    logger.error(err)
  }
}

exports.test = (req, res) => {
  res.json(true)
}
