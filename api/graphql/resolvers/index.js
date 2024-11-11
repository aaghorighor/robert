const userResolves = require('./user')
const securityResolves = require('./security')
const serviceTimeResolves = require('./service-time')
const serviceTimeAgendaResolves = require('./service-time-agenda')
const eventResolves = require('./event')
const eventAgendaResolves = require('./event-agenda')
const campaignResolves = require('./campaign')
const campaignContributionResolves = require('./campaign-contribution')
const donationResolves = require('./donation')
const fellowshipResolves = require('./fellowship')
const churchResolves = require('./church')
const sliderResolves = require('./slider')
const contactResolves = require('./contact')
const eventRegisterResolves = require('./event-register')
const pushNotificationResolves = require('./push-notification')
const memberResolves = require('./member')
const testimonyResolves = require('./testimonies')

module.exports = [
  userResolves,
  securityResolves,
  serviceTimeAgendaResolves,
  serviceTimeResolves,
  eventResolves,
  eventAgendaResolves,
  campaignResolves,
  campaignContributionResolves,
  donationResolves,
  fellowshipResolves,
  churchResolves,
  sliderResolves,
  contactResolves,
  eventRegisterResolves,
  pushNotificationResolves,
  memberResolves,
  testimonyResolves
]
