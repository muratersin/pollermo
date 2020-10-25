const path = require('path');
const fs = require('fs');

const morgan = require('morgan');

const accessLogFilePath = path.join(__dirname, '../../tmp/access.log');
const errorLogFilePath = path.join(__dirname, '../../tmp/error.log');

const accessLogger = morgan('combined', {
  skip: (req, res) => res.statusCode >= 400,
  stream: fs.createWriteStream(accessLogFilePath, {
    flags: 'a',
  }),
});

const errorLogger = morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: fs.createWriteStream(errorLogFilePath, {
    flags: 'a',
  }),
});

module.exports = {
  accessLogger,
  errorLogger,
};
