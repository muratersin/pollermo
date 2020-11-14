const dayjs = require('dayjs');

const { version } = require('../../package.json');
const config = require('../config');

function setLocales(req, res, next) {
  res.locals.CAPTCHA_SITE_KEY = config.captchaSiteKey;
  res.locals.DOMAIN = config.domain;
  res.locals.CDN = config.cdn;
  res.locals.VERSION = version;
  res.locals.formatDate = (d) => dayjs(d).format('DD/MM/YYYY HH:mm');
  next();
}

module.exports = setLocales;
