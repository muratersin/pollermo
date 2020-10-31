const path = require('path');
const fs = require('fs');

const morgan = require('morgan');

const errorLogFilePath = path.join(__dirname, '../../tmp/error.log');

const requestLogger = morgan(
  (tokens, req, res) =>
    [
      req.headers['x-real-ip'] || req.ip,
      `[${new Date().toUTCString()}]`,
      '-',
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' '),
  {
    skip: (req, res) => res.statusCode > 399,
  },
);

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
