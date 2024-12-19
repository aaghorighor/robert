/* eslint-disable radix */
const crypto = require('crypto');

const IV_LENGTH = 16; // For AES, this is always 16 bytes

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
  convertChosenTime,
  convert,
  getStripe,
  decrypt,
  encrypt,
  generateKey
};
