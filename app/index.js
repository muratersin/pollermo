const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const pollRouter = require('./routes/poll');

const { accessLogger, errorLogger } = require('./utils/logger');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const setLocalesMiddleware = require('./middlewares/set-locales');

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('dotenv').config();
}

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', true);

app.use(accessLogger);
app.use(errorLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(setLocalesMiddleware);

app.use('/', indexRouter);
app.use('/poll', pollRouter);

// catch 404 and forward to error handler
app.use(notFoundMiddleware);

// error handler
app.use(errorHandlerMiddleware);

module.exports = app;
