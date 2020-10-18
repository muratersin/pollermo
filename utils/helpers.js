const axios = require('axios');

async function verifyCaptchaToken({ token, ip }) {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const secret = process.env.CAPTCHA_SECRET_KEY;
  const payload = {
    secret,
    response: token,
    remoteip: ip,
  };

  console.log('*****************');
  console.log('CAPT PAY', payload);
  console.log('*****************');

  const response = await axios.post(url, payload);
  console.log('*****************');
  console.log('CAPT PAY', response.data);
  console.log('*****************');

  return response.data.success;
}

module.exports = {
  verifyCaptchaToken,
};
