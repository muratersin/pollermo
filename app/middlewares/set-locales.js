const { version } = require('../../package.json');
const config = require('../config');

function setLocales(req, res, next) {
  res.locals.CAPTCHA_SITE_KEY = config.captchaSiteKey;
  res.locals.DOMAIN = config.domain;
  res.locals.CDN = config.cdn;
  res.locals.VERSION = version;
  res.locals.CURRENT_URL = `${config.domain}${req.url}`;
  res.locals.TITLE = 'Pollermo - Create quick and simple polls';
  res.locals.DESCRIPTION = 'Pollermo';
  res.locals.PAGE_IMAGE_URL = `${config.domain}/images/ss.png`;
  next();
}

module.exports = setLocales;
