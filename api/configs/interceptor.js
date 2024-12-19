const interceptor = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://192.168.0.20:3000'
  ]
  const origin = req.headers.origin || ''
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, x-jerur-operation-name, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With'
  ) // If needed
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('X-Powered-By', 'Suftnet 1.0.0')
  res.setHeader('Access-Control-Max-Age', '1728000')

  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
    return
  }

  next()
}

module.exports = interceptor
