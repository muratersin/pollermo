const { version } = require('../../package.json');
const config = require('../config');

function setLocales(req, res, next) {
  res.locals.CAPTCHA_SITE_KEY = config.captchaSiteKey;
  res.locals.DOMAIN = config.domain;
  res.locals.CDN = config.cdn;
  res.locals.VERSION = version;
  next();
}

module.exports = setLocales;
