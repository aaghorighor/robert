/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const { updateOne } = require('./subscriptionUpdateService');
const { formatUnix, convertToUnixTimestamp } = require('../util/date-format');
const { DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz } = require('../configs/date-constants');

async function createUserSubscription(payUser, body) {
  const { email, first_name, last_name, mobile, planId, nickname } = body;
  const stripeCustomer = await stripe.customers.create({
    email,
    name: `${first_name} ${last_name}`,
    metadata: {
      suid: payUser.suid.toString(),
      name: `${payUser.name}`,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomer.id,
    items: [
      {
        price: planId,
      },
    ],
    default_tax_rates: [process.env.TAX_RATE_ID],
    metadata: {
      suid: payUser.suid.toString(),
      contact: `${first_name} ${last_name}`,
      churchName: `${payUser.name}`,
      userName: email,
    },
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });

  const account = await stripe.accounts.create({
    type: 'standard',
    country: payUser.address.country_code || undefined,
    email: payUser.email || undefined  
  });

  const stripe_user_id = account.id

  const startDate = formatUnix(
    subscription.current_period_start,
    DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz,
  );

  const endDate = formatUnix(
    subscription.current_period_end,
    DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz,
  );

  const token = jwt.sign(
    {
      subscriptionId: subscription.id,
      userId: payUser.id.toString(),
      suid: payUser.suid.toString(),
      role: payUser.role,
      startDate,
      endDate,
      status: subscription.status,
    },
    process.env.JWT_SECRET,
  );

  const payload = {
    user: {
      stripeCustomerId: stripeCustomer.id,
      stripe_user_id,
      userId: payUser.id.toString(),
      first_name,
      last_name,
      mobile,
      email,
      role: payUser.role,
      suid: payUser.suid.toString(),
      subscriptionId: subscription.id,
      startDate: convertToUnixTimestamp(subscription.current_period_start),
      endDate: convertToUnixTimestamp(subscription.current_period_end),
      address: payUser.address,
      status: subscription.status,
      plan: nickname,
      church: {
        email: payUser.email,
        mobile: payUser.mobile,
        name: payUser.name,
        description: '',
        secure_url: '',
        public_id: ''
      },
      currency: '£',
      tax_rate: '0',
      isSearchable: false,  
      enable_url_giving: false,
      enable_bank_transfer: false,
      enable_app_giving: false,
      features: [],
      prayer_request_email: '',
      giving_url: '',
      onboardingComplete: false
    },
    token,
    clientSecret: subscription?.latest_invoice.payment_intent?.client_secret,
  };

  await updateOne(
    payUser.suid.toString(),
    stripe_user_id,
    nickname,
    formatUnix(
      subscription.current_period_start,
      DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz,
    ),
    formatUnix(
      subscription.current_period_end,
      DATE_FORMAT_DD_MM_YYYY_HH_mm_ss_sz,
    ),
    planId,
    subscription.status,
    subscription.id,
    stripeCustomer.id,
  );

  return payload;
}

module.exports = {
  createUserSubscription,
};
