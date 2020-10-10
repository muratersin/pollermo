const Poll = require('../models/poll');

module.exports = function findPollBySlug(req, res, next) {
  const { slug } = req.params;

  Poll.findOne({ slug }, (err, result) => {
    if (!result) return next(new Error('Not found'));

    req.poll = result.toObject({ virtuals: true });
    next();
  });
};
