const createError = require('http-errors');

const Poll = require('../models/poll');
const ERROR_MESSAGES = require('../constants/messages');

module.exports = function findPollBySlug(req, res, next) {
  const { slug } = req.params;

  Poll.findOne({ slug }, (err, result) => {
    if (!result) return next(createError(404, ERROR_MESSAGES.NOT_FOUND));

    req.poll = result.toObject({ virtuals: true });
    next();
  });
};
