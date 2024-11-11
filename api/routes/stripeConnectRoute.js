/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const { connectAuthentication } = require('../controllers/stripe-connect-authentication');

router.get('/payout', connectAuthentication);

module.exports = router;
