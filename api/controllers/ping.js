/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable linebreak-style */

const { logger } = require('../util/logger')

exports.ping = async (req, res) => {
  try {
		
    res.json(new Date())
  } catch (err) {
    logger.error(err)
  }
}

exports.test = (req, res) => {
  res.json(true)
}
