const axios = require('axios');

async function verifyCaptchaToken(token) {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const secret = process.env.CAPTCHA_SECRET_KEY;
  const payload = {
    secret,
    response: token,
  };

  console.log('*****************');
  console.log('CAPT PAY', payload);
  console.log('*****************');

  const response = await axios({
    method: 'post',
    url: `${url}?secret=${payload.secret}&response=${payload.response}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log('*****************');
  console.log('CAPT PAY', response.data);
  console.log('*****************');

  return response.data.success;
}

module.exports = {
  verifyCaptchaToken,
};
