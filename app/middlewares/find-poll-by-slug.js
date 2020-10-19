const createError = require('http-errors');

const Poll = require('../models/poll');
const MESSAGES = require('../constants/messages');

function findPollBySlug(req, res, next) {
  const { slug } = req.params;

  Poll.findOne({ slug }, (err, result) => {
    if (!result) return next(createError(404, MESSAGES.NOT_FOUND));

    req.poll = result;
    next();
  });
}

module.exports = findPollBySlug;
