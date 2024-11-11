const { UserInputError, ApolloError } = require('apollo-server')
const { CampaignContribution, Campaign } = require('../model')
const { identifierValidator } = require('../validation/identifierValidator')

const {
  campaignContributionValidator
} = require('../validation/campaignContributionValidator')
const { logger } = require('../util/logger')

async function updateCampaignAmount(campaignId, amount) {
  const updatedCampaign = await Campaign.updateOne(
    { _id: campaignId },
    { $inc: { current_amount_funded: amount } }
  )

  if (updatedCampaign.nModified === 0) {
    throw new UserInputError('Campaign not found or update failed')
  }
}

async function addContribution(body) {
  const { campaign, amount } = body
  const bodyErrors = campaignContributionValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const newCampaignContribution = new CampaignContribution({
      ...body
    })

    const savedCampaignContribution = await newCampaignContribution.save()

    await updateCampaignAmount(campaign, amount)

    return savedCampaignContribution
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding campaign contribution')
  }
}

async function getContributionById(id) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }
  try {
    const campaignContribution = await CampaignContribution.findById(id)
    return campaignContribution
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching campaign contribution')
  }
}

async function getContributionsByUser(email) {
  try {
    const allCampaignContributions = await CampaignContribution.find({
      email
    })
    return allCampaignContributions
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching campaign contribution by email')
  }
}

async function getContributionsByCampaignId(id) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  try {
    const allCampaignContributions = await CampaignContribution.find({
      campaignId: id
    })
    return allCampaignContributions
  } catch (error) {
    logger.error(error)
    throw new ApolloError(
      'Error fetching campaign contribution by campaign id'
    )
  }
}

module.exports = {
  addContribution,
  getContributionById,
  getContributionsByUser,
  getContributionsByCampaignId
}
