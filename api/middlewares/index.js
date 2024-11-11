/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const { config } = require('../configs');
const { AuthenticationError } = require('apollo-server-express');
const { ApolloError } = require('apollo-server-express');
const { UserInputError } = require('apollo-server-express');

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

exports.customerMiddleware = (req, res, next) => {
  const user = verifyToken(req, res);
  req.user = user;
  next();
};

const verifyToken = (req, res) => {

  let token = req.headers?.authorization || '';

  if (!token || token === 'null' || token === 'undefined') {
    token = req.cookies?.authToken || '';
  }

  if (!token) {
    throw new AuthenticationError('Unauthorized');
  }

  let user;
  try {
    user = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR');
  }

  if (!user) {
    throw new UserInputError('Bad Request');
  }

  return user;
};

exports.customerMiddleware = (req, res, next) => {
  const user = verifyToken(req, res);
  if (!user) {
    throw new UserInputError('Bad Request');
  }

  req.user = user;
  next();
};

exports.apiKeyAuthMiddleware = (req, res, next) => {
  const apiKey = req.headers['j-api-key'];
  if (!apiKey || apiKey !== process.env.JERUR_SECRET_KEY) {
    return res.status(401).json({ message: 'Invalid or missing API key' });
  }
  next();
};
