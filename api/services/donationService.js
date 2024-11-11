const { UserInputError, ApolloError } = require('apollo-server')
const { Types } = require('mongoose')
const { Donation } = require('../model')
const { identifierValidator } = require('../validation/identifierValidator')
const { donationValidator } = require('../validation/donationValidator')
const { logger } = require('../util/logger')

async function addDonation({ suid }, body) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = donationValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const newDonation = new Donation({
      suid,
      ...body
    })

    const savedDonation = await newDonation.save()
    return savedDonation
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding donation')
  }
}

async function updateDonation(id, body) {
  const identifierValidateResult = identifierValidator(id)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = donationValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    await Donation.findByIdAndUpdate(id, body, {
      new: true
    })
    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error editing donation')
  }
}

async function deleteDonation(id) {
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
    await Donation.findByIdAndRemove(id)
    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error deleting donation')
  }
}

async function getDonationById(id) {
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
    const donation = await Donation.findById(id)
    return donation
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching donation')
  }
}

async function getAllDonations({ suid }) {
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
    const allDonations = await Donation.find({ suid }).sort({ createdAt: -1 })
    return allDonations
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching all donation')
  }
}

async function getDonationByDailyAggregates({ suid }) {
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
    const startOfWeek = new Date()
    startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay()) // Set to the last Sunday
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6) // Set to the next Saturday

    const results = await Donation.aggregate([
      {
        $match: {
          suid: Types.ObjectId(suid),
          date_donated: { $gte: startOfWeek, $lte: endOfWeek }
        }
      },
      {
        $group: {
          _id: {
            weekOfYear: { $week: '$date_donated' },
            year: { $year: '$date_donated' },
            type: '$donation_type'
          },
          totalAmount: { $sum: '$amount' }
        }
      }
    ])

    const dailySummary = results.map(item => ({
      weekOfYear: `${item._id.year}-W${item._id.weekOfYear}`,
      year: item._id.year,
      donations: [{ type: item._id.type, totalAmount: item.totalAmount }]
    }))

    return dailySummary
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching donation aggregates')
  }
}

async function getDonationByMonthlyAggregates({ suid }) {
  try {
    const currentYear = new Date().getFullYear()
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    const donationAggregates = await Donation.aggregate([
      {
        $match: {
          suid: Types.ObjectId(suid),
          date_donated: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$date_donated' },
            year: { $year: '$date_donated' }
          },
          totalAmount: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ])

    const aggregatedDataWithMonthNames = donationAggregates.map(entry => {
      const monthNumber = entry._id.month
      const monthName = monthNames[monthNumber - 1] // Array index is 0-based
      return {
        ...entry,
        _id: { ...entry._id, month: monthName }
      }
    })

    return aggregatedDataWithMonthNames
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching donation aggregates')
  }
}

async function getByDonationTypeAggregates({ suid }) {
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
    const currentYear = new Date().getFullYear()

    const donationAggregates = await Donation.aggregate([
      {
        $match: {
          suid: Types.ObjectId(suid),
          date_donated: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: {
            donation_type: '$donation_type',
            year: { $year: '$date_donated' }
          },
          totalAmount: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.donation_type': 1 }
      }
    ])

    return donationAggregates
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching donation aggregates')
  }
}

async function getDonations({ suid }, pageNumber, pageSize, filterTerm) {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const page = parseFloat(pageNumber, 10) || 1
  const size = parseFloat(pageSize, 10) || 1
  const skipCount = (page - 1) * size

  const baseConditions = { suid }

  let filterConditions = []
  if (filterTerm) {
    filterConditions = [
      { donation_type: new RegExp(filterTerm, 'i') },
      { first_name: new RegExp(filterTerm, 'i') },
      { last_name: new RegExp(filterTerm, 'i') }
    ]

    const targetAmount = parseFloat(filterTerm)
    if (!Number.isNaN(targetAmount)) {
      filterConditions.push({ amount: targetAmount })
    }

    if (filterTerm === 'YES' || filterTerm === 'yes') {
      filterConditions.push({ online: true })
    }

    if (filterTerm === 'NO' || filterTerm === 'no') {
      filterConditions.push({ online: false })
    }
  }

  const queryConditions = filterTerm ?
    {
      $and: [baseConditions, { $or: filterConditions }]
    } :
    baseConditions

  try {
    const countQuery = Donation.countDocuments(queryConditions)
    const totalDonationsCount = await countQuery
    const donations = await Donation.find(queryConditions)
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(size)

    return {
      pageInfo: {
        pageNumber,
        pageSize,
        totalPages: Math.ceil(totalDonationsCount / pageSize)
      },
      donations
    }
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching donations')
  }
}

async function filterDonationsByDate(
  { suid },
  startDateStr,
  endDateStr,
  donation_type
) {
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
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      throw new Error('Invalid date format')
    }

    const filter = {
      date_donated: {
        $gte: startDate,
        $lte: endDate
      },
      suid
    }

    if (donation_type) {
      filter.donation_type = donation_type
    }

    const donations = await Donation.find(filter)
    const totalAmount = donations.reduce(
      (total, donation) => total + donation.amount,
      0
    )

    return {
      donations,
      totalAmount
    }
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error filtering donations')
  }
}

module.exports = {
  deleteDonation,
  updateDonation,
  addDonation,
  getDonationById,
  getAllDonations,
  getDonationByMonthlyAggregates,
  getByDonationTypeAggregates,
  getDonations,
  filterDonationsByDate,
  getDonationByDailyAggregates
}
