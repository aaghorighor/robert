const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')
const { config } = require('./api/configs')
const { accessLogStream } = require('./api/util/logger')
const pingRoute = require('./api/routes/ping')
const reviewRoute = require('./api/routes/reviewRoute')

dotenv.config()

async function startServer() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'))

  const app = express()
  const httpServer = http.createServer(app)

  const environment = process.env.NODE_ENV || 'development'

  if (environment) {
    app.use(morgan('dev'))
  }

  app.use(morgan('combined', { stream: accessLogStream }))
  // app.use(interceptor)

  // app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static('public'))
 
  app.use(cors()); 
  app.use('/api', reviewRoute)
  app.use('/api', pingRoute)
  app.use(cookieParser())

  if (
    process.env.NODE_ENV === 'production' ||
		process.env.NODE_ENV === 'staging' ||
		process.env.NODE_ENV === 'development'
  ) {
    app.use(express.static(path.join(__dirname, 'api/site/dist')))
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'api/site/dist', 'index.html'))
    })
  }

  const post = process.env.PORT || config.PORT
  await new Promise(resolve => httpServer.listen({ port: post }, resolve))
  console.log(`Server started on ${post}`)
}
startServer()
