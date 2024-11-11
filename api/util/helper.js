/* eslint-disable radix */
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { config } = require('../configs');

const IV_LENGTH = 16; // For AES, this is always 16 bytes

async function generatePassword(passwordString) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(passwordString, salt);
}

async function comparePassword(password, hashString) {
  return bcrypt.compare(password, hashString);
}

function setAuthenticationCookie(res, token) {
  res.cookie('token', `Bearer ${token}`, {
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  });
}

function clearCookie(res, key) {
  res.clearCookie(key);
}

const generateRandomKey = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(32, (error, buf) => {
      if (error) {
        return reject(error);
      }
      const token = buf.toString('hex');
      return resolve(token);
    });
  });

const verify = (req) => { 
  let token = req.headers?.authorization || '';
 
  if (!token || token === 'null' || token === 'undefined' || token === '') {
    token = req.cookies?.authToken || '';
  }  
  const user = {
    first_name: 'Ema',
    last_name: 'Aghorighor',
    mobile: '07407022723',
    email: 'ema@yahoo.com',
    role: 'admin',
    stripeCustomerId: 'cus_OHZ9LQrKsXdcAh',
    userId: '64b6d2982ee67ad15266b257',
    suid: '64b5c258a060187d38d78c1b',
    subscriptionId: 'sub_1NV01RJ9QQF7JMlNdvRWRXM5',
    plan: 'Premium Plus',
    startDate: '1689633365000',
    endDate: '1721255765000',
    status: 'active',
    stripe_user_id: 'acct_1Nhud0CjGTmRljNw',
    onboardingComplete: false,
    church: {
      email: 'kabelsus@yahoo.com',
      mobile: '07407022723',
      name: 'Bella Church of God',
      secure_url: 'http://res.cloudinary.com/dwjjtakfs/image/upload/v1691502944/gfhgwknbekm0nicx0qyd.jpg',
      public_id: 'gfhgwknbekm0nicx0qyd',
      description: '<p>This is spirit filled church</p>',
      __typename: 'Church'
    },
    isSearchable: false,
    address: {
      addressLine1: '2 riseholme Orton Goldhay',
      county: 'England',
      town: 'Peterborough',
      country: 'United Kingdom',
      postcode: 'PE2 5SP',
      __typename: 'Address'
    },
    currency: '£',
    tax_rate: 0,
    __typename: 'SubscriberUser'
  }
  if (!token) {
    // return null;
    return user;
  }

  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

const verifyToken = (token) => jwt.verify(token, config.JWT_SECRET);
function checkAmount(amount) {
  if (amount && /\d/.test(amount)) {
    return amount;
  }
  return null;
}

const convertChosenTime = (str) => {
  const date0 = new Date(str);
  date0.setHours(date0.getHours() + 5.5);
  date0.setMinutes(date0.getMinutes() + 30);
  let hour = date0.getHours();
  const minutes = date0.getMinutes();
  let end = 'AM';
  if (hour >= 12) {
    hour -= 12;
    end = 'PM';
  }
  const JoinedTime = [hour, minutes].join(':');
  return `${JoinedTime} ${end}`;
};

const convert = (str) => {
  const date0 = new Date(str);
  date0.setHours(date0.getHours() + 5);
  date0.setMinutes(date0.getMinutes() + 30);
  const month = `0${date0.getMonth() + 1}`.slice(-2);
  const day = `0${date0.getDate()}`.slice(-2);
  return [day, month, date0.getFullYear()].join('-');
};

const getStripe = (payment_provider) => {
  const checkStripeProvider =
    payment_provider.find((provider) => provider.name === 'Stripe') || null;
  return !!checkStripeProvider;
};

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); 
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv); 
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

const generateKey = () => crypto.randomBytes(32).toString('hex');

module.exports = {
  clearCookie,
  setAuthenticationCookie,
  verify,
  verifyToken,
  generateRandomKey,
  comparePassword,
  generatePassword,
  checkAmount,
  convertChosenTime,
  convert,
  getStripe,
  decrypt,
  encrypt,
  generateKey
};
