const {
  login,
  verificationCode,
  createSubscription,
  signOn,
  forgotPassword,
  resetPassword,
} = require('../../services/securityService')

const maxAgeInSeconds = 60 * 60 * 24 * 30

const resolvers = {
  Mutation: {
    createSubscription: async (_, { subscriber }, { res }) => {
      const { token, user, clientSecret } = await createSubscription(
        subscriber
      )
      res.cookie('authToken', token, {
        maxAge: maxAgeInSeconds * 1000,
        sameSite: 'Lax',
        httpOnly: true,
        secure: true
      })
      return { user, clientSecret }
    },
    login: (_, { email }) => login({ email }),
    signOn: async (_, { email, password }, { res }) => {
      const { token, user } = await signOn({ email, password })
      res.cookie('authToken', token, {
        maxAge: maxAgeInSeconds * 1000,
        sameSite: 'Lax',        
        httpOnly: true,
        secure: true
      })
      return { user }
    },
    forgotPassword: (_, { email }) => forgotPassword({ email }),
    resetPassword: (_, { password, token }) => resetPassword(password, token),
    verificationCode: (_, { email, code }) => verificationCode({ email, code }),
    logout: (_, args, { res }) => {    
      res.clearCookie('authToken')
      return true
    }
  }
}

module.exports = resolvers
