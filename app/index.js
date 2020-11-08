const express = require('express');

const init = require('./lib');

const app = express();

module.exports = init(app);
