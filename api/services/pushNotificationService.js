const { UserInputError, ApolloError } = require('apollo-server')
const {
  pushNotificationValidator
} = require('../validation/pushNotificationValidator')
const {
  identifierValidator,
  identifierValidators
} = require('../validation/identifierValidator')
const { logger } = require('../util/logger')
const { Church } = require('../model')
const { sendNotification } = require('../util/android_notification')
const { MESSAGE_TYPE_ENUMS } = require('../util/enums')

const addPushNotification = async ({ suid }, body) => {
  const { title, message, send_notification } = body
  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = pushNotificationValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    const church = await Church.findOneAndUpdate(
      { _id: suid },
      { $push: { push_notifications: body } },
      { new: true }
    ).exec()

    const pushNotifications =
			church.push_notifications[church.push_notifications.length - 1]

    if (send_notification) {
      await sendNotification(
        title,
        message,
        suid,
        MESSAGE_TYPE_ENUMS.NOTIFY       
      )
    }

    return pushNotifications
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error adding push notifications')
  }
}

const updatePushNotification = async (notificationId, body, { suid }) => {
  const { title, status, message, send_notification } = body

  const identifierValidateResult = identifierValidator(suid)
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    )
  }

  const bodyErrors = pushNotificationValidator(body)
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    })
  }

  try {
    await Church.updateOne(
      { suid, 'push_notifications._id': notificationId },
      {
        $set: {
          'push_notifications.$.message': message,
          'push_notifications.$.title': title,
          'push_notifications.$.status': status
        }
      }
    ).exec()

    if (send_notification) {
      await sendNotification(
        title,
        message,
        suid,
        MESSAGE_TYPE_ENUMS.NOTIFY     
      )
    }

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error updating push notifications')
  }
}

const removePushNotification = async ({ suid }, notificationId) => {
  const identifierValidateResult = identifierValidators([
    { suid },
    { notificationId }
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
      { $pull: { push_notifications: { _id: notificationId } } },
      { new: true }
    ).exec()

    return true
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error deleting push notifications')
  }
}
const getFilteredAndSortedPushNotifications = notifications =>
  notifications
    .filter(notification => notification.status === true)
    .sort((a, b) => b.createdAt - a.createdAt)

const fetchAllPushNotifications = async suid => {
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

    const pushNotifications = getFilteredAndSortedPushNotifications(
      church.push_notifications
    )
    return pushNotifications
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching push notifications')
  }
}

const getAllPushNotifications = async ({ suid }) => {
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

    const sliders = church.push_notifications.sort(
      (a, b) => b.createdAt - a.createdAt
    )
    return sliders
  } catch (error) {
    logger.error(error)
    throw new ApolloError('Error fetching push notification')
  }
}
module.exports = {
  addPushNotification,
  updatePushNotification,
  removePushNotification,
  fetchAllPushNotifications,
  getAllPushNotifications
}
