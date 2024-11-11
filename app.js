const dotenv = require('dotenv')
const path = require('path')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginDrainHttpServer
} = require('@apollo/server/plugin/drainHttpServer')
// const rateLimit = require('express-rate-limit')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')
const resolvers = require('./api/graphql/resolvers')
const schemas = require('./api/graphql/schemas')
const { config } = require('./api/configs')
const { verify } = require('./api/util/helper')
const { accessLogStream } = require('./api/util/logger')
const customerStripePortalRoute = require('./api/routes/customerStripePortal')
const stripeConnectRoute = require('./api/routes/stripeConnectRoute')
const { webHooks } = require('./api/controllers/webHooks')
const pingRoute = require('./api/routes/ping')
const stripeSetupIntentsRoute = require('./api/routes/stripeSetupIntents')
const createStripeConnectAccountRoute = require('./api/routes/create-stripe-connect-account')
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
  const corsOptions = {
    optionsSuccessStatus: 200,
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }
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

  const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    persistedQueries: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: formattedError => {
      console.log(formattedError)
      return {
        message: formattedError.message,
        code: formattedError.extensions.code
      }
    }
  })

  await server.start()

  app.use((req, res, next) => {
    if (
      req.originalUrl === '/webhook' ||
			req.originalUrl === '/webhook/connect'
    ) {
      next()
    } else {
      express.json()(req, res, next)
    }
  })

  app.use(cors()); // Enable CORS for all origins
  app.use('/api', createStripeConnectAccountRoute)
  app.use('/api', customerStripePortalRoute)
  app.use('/api', stripeConnectRoute)
  app.use('/api', stripeSetupIntentsRoute)
  app.use('/api', reviewRoute)
  app.use('/api', pingRoute)
  
  app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webHooks)
  app.use(cookieParser())

  app.use(
    '/graphql',
    cors(corsOptions),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        user: verify(req),
        saltRounds: config.SALT_ROUND,
        res
      })
    })
  )

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
