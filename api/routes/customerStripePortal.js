/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const { createCustomerPortalSession } = require('../controllers/customerStripePortal');

router.post('/create-customer-portal-session', createCustomerPortalSession);

module.exports = router;
