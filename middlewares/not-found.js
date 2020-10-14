const createError = require('http-errors');

const MESSAGES = require('../constants/messages');

function notFound(req, res, next) {
  return next(createError(404, MESSAGES.NOT_FOUND));
}

module.exports = notFound;
