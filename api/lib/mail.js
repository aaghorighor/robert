require('dotenv').config()
const nodeMailer = require('nodemailer')
const sendGrid = require('@sendgrid/mail')
const { logger } = require('../util/logger')

sendGrid.setApiKey(process.env.SEND_GRID_API_KEY)

exports.sendEmail = async body => {
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: process.env.EMAIL_SERVER_PORT,
    secure: false,
    requireTLS: false,
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASSWORD
    }
  })
  try {
    const info = await transporter.sendMail(body)
    return console.log(`Message sent: ${info.response}`)
  } catch (err) {
    return console.log(`Problem sending email: ${err}`)
  }
}

exports.sendGridEmail = async mailOptions => {
  await sendGrid
    .send(mailOptions)
    .then(response => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch(error => {
      logger.error(error)
    })
}

exports.sendGridMail = mailOptions => {
  switch (process.env.MAIL_PROVIDER) {
    case 'SEND_GRID':
      this.sendGridEmail(mailOptions)
      break
    case 'NODE_MAILER':
      this.sendEmail(mailOptions)
      break
    default:
      this.sendEmail(mailOptions)
      break
  }
}
