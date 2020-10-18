const axios = require('axios');

async function verifyCaptchaToken({ token, ip }, callBack) {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const secret = process.env.CAPTCHA_SECRET_KEY;
  const payload = {
    secret,
    response: token,
    remoteip: ip,
  };
  console.log('CAPT PAY', payload);
  axios
    .post(url, payload)
    .then((response) => {
      console.log('CAPT RESP --', response);
      callBack(response.data.success);
    })
    .catch((err) => {
      console.log('CAPT ERR', err);
      callBack(false);
    });
}

module.export = {
  verifyCaptchaToken,
};
