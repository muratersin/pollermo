const axios = require('axios');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

async function verifyCaptchaToken(token) {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const secret = process.env.CAPTCHA_SECRET_KEY;
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
