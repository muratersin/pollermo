const path = require('path');
const fs = require('fs');

const morgan = require('morgan');

const errorLogFilePath = path.join(__dirname, '../../tmp/error.log');

const requestLogger = morgan('combined', {
  skip: (req, res) => res.statusCode > 399,
});

const errorLogger = morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: fs.createWriteStream(errorLogFilePath, {
    flags: 'a',
  }),
});

module.exports = {
  requestLogger,
  errorLogger,
};
