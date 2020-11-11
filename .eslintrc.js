module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  globals: {
    grecaptcha: true,
  },
  rules: {
    'consistent-return': 0,
    'implicit-arrow-linebreak': 0,
    'no-underscore-dangle': 0,
  },
};
