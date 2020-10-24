function isEmbeded(req, res, next) {
  res.locals.isEmbeded = Object.prototype.hasOwnProperty.call(req.query, 'embeded');
  next();
}

module.exports = isEmbeded;
