const { version } = require('../../package.json');

function setLocales(req, res, next) {
  res.locals.DOMAIN = process.env.DOMAIN;
  res.locals.CDN = process.env.CDN;
  res.locals.VERSION = version;
  next();
}

module.exports = setLocales;
