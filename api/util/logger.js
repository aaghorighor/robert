/* eslint-disable linebreak-style */
const bunyan = require('bunyan');
const path = require('path');
const fs = require('fs');

fs.existsSync('logs') || fs.mkdirSync('logs');

const env =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), 'logs', `${env}.log`),
  { flags: 'a' },
);

const logger = bunyan.createLogger({
  name: 'jsl-jerur',
  streams: [
    {
      type: 'rotating-file',
      path: 'logs/info.log',
      period: '1d',
      level: 'info',
      count: 3,
    },
    {
      type: 'rotating-file',
      path: 'logs/error.log',
      period: '1d',
      level: 'error',
      count: 7,
    },
    {
      type: 'rotating-file',
      path: 'logs/trace.log',
      period: '1d',
      level: 'trace',
      count: 3,
    },
  ],
});

module.exports = {
  accessLogStream,
  logger,
};
