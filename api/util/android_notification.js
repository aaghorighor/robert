const admin = require('firebase-admin')
const serviceAccount = require('../configs/firebase/admin.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'jerur-sa'
})

exports.sendNotification = async (
  title,
  body,
  church_id,
  message_type = ''
) => {
  const sentTime = new Date().toLocaleString()
  const dataContent = {
    title,
    body,
    sentTime,
    messageType: message_type    
  }

  const notificationContent = {
    title,
    body
  }

  const message = {
    data: dataContent,
    notification: notificationContent,
    topic: church_id
  }

  try {
    const response = await admin.messaging().send(message)
    console.log('Successfully sent message:', response)
  } catch (error) {
    console.error('Error sending message:', error)
  }
}
