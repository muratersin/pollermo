function setLocales(req, res, next) {
  res.locals.DOMAIN = process.env.DOMAIN;
  res.locals.CDN = process.env.CDN;
  next();
}

module.exports = setLocales;
