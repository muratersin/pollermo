if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('dotenv').config();
}

module.exports = {
  env: process.env.NODE_ENV || 'developlent',
  mongodbURI: process.env.MONGODB_URI,
  domain: process.env.DOMAIN || 'http://localhost:3000',
  cdn: process.env.CDN || 'http://localhost:3000',
  port: process.env.PORT || 3000,
  captchaSiteKey: process.env.CAPTCHA_SITE_KEY,
  captchaSecretKey: process.env.CAPTCHA_SECRET_KEY,
};
