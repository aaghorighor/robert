const Constants = require('./constants')
const apn = require('apn')
const FCM = require('fcm-push')

// iOS
const options = { cert: './src/common/certs/rethink.pem', key: './src/common/certs/rethink.pem', production: true }
const apnProvider = new apn.Provider(options)

// android
const serverKey = Constants.FCMSenderKey
const fcm = new FCM(serverKey)

function Utils() {

}

Utils.pushNotification = function ({ title, message, payload, platform, deviceToken }, callback) {
  if (deviceToken === undefined || deviceToken.length === 0) {
    return
  }

  if (platform === Constants.DeviceOS.iOS) {
    const note = new apn.Notification()
    note.sound = 'default'
    note.alert = { title, body: message }
    note.topic = 'com.minhtruong315.nicessam'
    note.payload = payload
    note.badge = 0

    apnProvider.send(note, deviceToken).then((result) => {
      console.log(result)
      callback(result)
    })
  } else {
    const msgObj = {
      data: payload,
      notification: {
        title: message,
        body: message,
        text: message,
        sound: 'default'
        // click_action: "OPEN_MAIN_ACTIVITY"
      },
      to: deviceToken
    }
    fcm.send(msgObj)
      .then((response) => {
        callback(response)
        console.log('Successfully sent with response: ', response)
      })
      .catch((err) => {
        callback(err)
        console.log('Something has gone wrong!')
        console.log(err)
      })
  }
}

module.exports = Utils
