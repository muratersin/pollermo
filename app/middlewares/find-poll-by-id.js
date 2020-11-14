const createError = require('http-errors');

const Poll = require('../models/poll');
const MESSAGES = require('../constants/messages');

function findPollById(req, res, next) {
  const { id } = req.params;

  Poll.findById(id, (err, result) => {
    if (!result) return next(createError(404, MESSAGES.NOT_FOUND));

    req.poll = result;
    next();
  });
}

module.exports = findPollById;
