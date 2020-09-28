const mongoose = require('mongoose');

const pollSchema = {
  question: {
    type: String,
    minLength: 6,
    maxLength: 500,
  },
  ipDupCheck: {
    type: Number,
    enum: [1, 2, 3],
  },
  multi: {
    type: Boolean,
    default: false,
  },
  captcha: {
    type: Boolean,
    default: false,
  },
  options: [{
    type: String,
    minLength: 1,
    maxLength: 100,
  }],
};

module.exports = mongoose.model('Poll', pollSchema);
