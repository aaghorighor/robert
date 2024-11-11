const { UserInputError, ApolloError } = require('apollo-server')
const { Campaign } = require('../model')
const { identifierValidator } = require('../validation/identifierValidator')
const { campaignValidator } = require('../validation/campaignValidator')
const { logger } = require('../util/logger')

async function addCampaign({ suid }, body) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = campaignValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const newCampaign = new Campaign({
      suid,
      ...body
    })

    const savedCampaign = await newCampaign.save()
    return savedCampaign
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding campaign')
  }
}

async function updateCampaign(id, body) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = campaignValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    await Campaign.findByIdAndUpdate(id, body, {
      new: true
    })
    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error editing campaign')
  }
}

async function deleteCampaign(id) {
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
    await Campaign.findByIdAndRemove(id)
    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error deleting campaign')
  }
}

async function getCampaignById(id) {
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
    const campaign = await Campaign.findById(id)
    return campaign
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching campaign')
  }
}

async function getAllCampaigns({ suid }) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }
  try {
    const allCampaigns = await Campaign.find({ suid }).sort({ createdAt: -1 })
    return allCampaigns
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching all campaigns')
  }
}

async function countInCampaignCollection({ suid }) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }
  try {
    const campaignCount = await Campaign.countDocuments({
      suid
    })
    return campaignCount
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching campaign count')
  }
}

async function getTop10Campaigns({ suid }) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }
  try {
    const campaigns = await Campaign.find({ suid, status: true })
      .sort({
        target_amount: -1
      })
      .limit(10)
    return campaigns
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching all campaigns')
  }
}

async function getCampaigns({ suid }, pageNumber, pageSize, filterTerm) {
  const page = parseFloat(pageNumber, 10) || 1
  const size = parseFloat(pageSize, 10) || 1
  const skipCount = (page - 1) * size

  const baseConditions = { suid }

  let filterConditions = []
  if (filterTerm) {
    filterConditions = [{ title: new RegExp(filterTerm, 'i') }]

    const targetAmount = parseFloat(filterTerm)
    if (!Number.isNaN(targetAmount)) {
      filterConditions.push({ target_amount: targetAmount })
      filterConditions.push({ current_amount_funded: targetAmount })
    }

    if (filterTerm === 'YES' || filterTerm === 'yes') {
      filterConditions.push({ status: true })
    }

    if (filterTerm === 'NO' || filterTerm === 'no') {
      filterConditions.push({ status: false })
    }
  }

  const queryConditions = filterTerm ?
    {
      $and: [baseConditions, { $or: filterConditions }]
    } :
    baseConditions

  try {
    const countQuery = Campaign.countDocuments(queryConditions)
    const totalCampaignsCount = await countQuery
    const campaigns = await Campaign.find(queryConditions)
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(size)

    return {
      pageInfo: {
        pageNumber,
        pageSize,
        totalPages: Math.ceil(totalCampaignsCount / pageSize)
      },
      campaigns
    }
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching campaigns')
  }
}

async function fetchTop10Campaigns(suid) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }
  try {
    const campaigns = await Campaign.find({ suid, status: true })
      .sort({
        target_amount: -1
      })
      .limit(10)
    return campaigns
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching all campaigns')
  }
}

async function fetchCampaigns(suid, pageNumber, pageSize, filterTerm) {
  const page = parseFloat(pageNumber, 10) || 1
  const size = parseFloat(pageSize, 10) || 1
  const skipCount = (page - 1) * size
 
  const baseConditions = { suid, status: true }

  let filterConditions = []
  if (filterTerm) {
    filterConditions = [{ title: new RegExp(filterTerm, 'i') }]
  }

  const queryConditions = filterTerm ?
    {
      $and: [baseConditions, { $or: filterConditions }]
    } :
    baseConditions

  try {
    const countQuery = Campaign.countDocuments(queryConditions)
    const totalCampaignsCount = await countQuery
    const campaigns = await Campaign.find(queryConditions)
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(size)

    return {
      pageInfo: {
        pageNumber,
        pageSize,
        totalPages: Math.ceil(totalCampaignsCount / pageSize)
      },
      campaigns
    }
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching campaigns')
  }
}

module.exports = {
  addCampaign,
  updateCampaign,
  deleteCampaign,
  getCampaignById,
  getAllCampaigns,
  countInCampaignCollection,
  getTop10Campaigns,
  getCampaigns,
  fetchCampaigns,
  fetchTop10Campaigns
}
