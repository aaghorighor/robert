const { UserInputError, ApolloError } = require('apollo-server')
const { contactValidator } = require('../validation/contactValidator')
const {
  identifierValidator,
  identifierValidators
} = require('../validation/identifierValidator')
const { logger } = require('../util/logger')
const { Church } = require('../model')

const addContact = async ({ suid }, body) => {
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = contactValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const church = await Church.findByIdAndUpdate(
      suid,
      { $push: { contacts: body } },
      { new: true }
    )

    const newContact = church.contacts[church.contacts.length - 1]
    return newContact
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding contact')
  }
}

const updateContact = async (contactId, body, { suid }) => {
  const { title, status, fullNames, phone } = body

  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = contactValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    await Church.updateOne(
      { suid, 'contacts._id': contactId },
      {
        $set: {
          'contacts.$.fullNames': fullNames,
          'contacts.$.title': title,
          'contacts.$.phone': phone,
          'contacts.$.status': status
        }
      }
    ).exec()

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error updating contact')
  }
}

const removeContact = async ({ suid }, contactId) => {
  const identifierValidateResult = identifierValidators([
    { suid },
    { contactId }
  ])
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  try {
    await Church.findByIdAndUpdate(
      suid,
      { $pull: { contacts: { _id: contactId } } },
      { new: true }
    ).exec()

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error deleting contacts')
  }
}
const getFilteredAndSortedContacts = contacts =>
  contacts
    .filter(contact => contact.status === true)
    .sort((a, b) => b.createdAt - a.createdAt)

const fetchAllContacts = async suid => {
  const identifierValidationErrors = identifierValidator(suid)
  if (identifierValidationErrors.length) {
    const errorMessages = identifierValidationErrors
      .map(err => err.message)
      .join(',')
    const invalidFields = identifierValidationErrors
      .map(err => err.field)
      .join(',')
    throw new UserInputError(errorMessages, { invalidArgs: invalidFields })
  }

  try {
    const church = await Church.findOne({ _id: suid })

    if (!church) {
      throw new UserInputError('Church not found')
    }

    const contacts = getFilteredAndSortedContacts(church.contacts)
    return contacts
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching contacts')
  }
}

const getAllContacts = async ({ suid }) => {
  const identifierValidationErrors = identifierValidator(suid)
  if (identifierValidationErrors.length) {
    const errorMessages = identifierValidationErrors
      .map(err => err.message)
      .join(',')
    const invalidFields = identifierValidationErrors
      .map(err => err.field)
      .join(',')
    throw new UserInputError(errorMessages, { invalidArgs: invalidFields })
  }

  try {
    const church = await Church.findOne({ _id: suid })

    if (!church) {
      throw new UserInputError('Church not found')
    }

    const contacts = church.contacts.sort((a, b) => b.createdAt - a.createdAt)
    return contacts
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching contacts')
  }
}
module.exports = {
  addContact,
  updateContact,
  removeContact,
  fetchAllContacts,
  getAllContacts
}
