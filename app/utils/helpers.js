const axios = require('axios');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const config = require('../config');

dayjs.extend(utc);

async function verifyCaptchaToken(token) {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const secret = config.captchaSecretKey;
  const payload = {
    secret,
    response: token,
  };

  const response = await axios({
    method: 'post',
    url: `${url}?secret=${payload.secret}&response=${payload.response}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.success;
}

module.exports = {
  verifyCaptchaToken,
  dayjs,
};
