/* eslint-disable linebreak-style */
/* eslint-disable radix */
/* eslint-disable linebreak-style */
const dayjs = require('dayjs');
const moment = require('moment');

exports.formatDate = (date = null, format) => {
  let dateFormat = dayjs();
  if (date) {
    dateFormat = dayjs(date);
  }
  return dateFormat.format(format);
};

exports.momentDateFormat = (date, format) => moment.unix(date).format(format);

exports.formatUnixDate = (date = null, format) => {
  const dateFormat = dayjs.unix(date);
  return dateFormat.format(format);
};

exports.formatUnix = (date, format) => {
  const dateFormat = new Date(date * 1000).toString(format);
  return dateFormat;
};

exports.convertToUnixTimestamp = (timestampString) => {
  const timestamp = parseInt(timestampString) * 1000;
  return new Date(timestamp);
};
