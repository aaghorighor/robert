const User = require('./user')
const Church = require('./church')
const ServiceTime = require('./service-time')
const Event = require('./event')
const Campaign = require('./campaign')
const CampaignContribution = require('./campaign-contribution')
const Donation = require('./donation')
const Fellowship = require('./fellowship')
const Member = require('./member')
const Testimonies = require('./testimonies')
const Review = require('./review')

const models = {
  User,
  Church,
  ServiceTime,
  Event,
  Campaign,
  CampaignContribution,
  Donation,
  Fellowship,
  Member,
  Testimonies,
  Review
}

module.exports = models
