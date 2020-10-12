function setLocales(req, res, next) {
  res.locals.DOMAIN = process.env.DOMAIN;
  next();
}

module.exports = setLocales;
