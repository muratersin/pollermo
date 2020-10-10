const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Vote = require('./vote');
const Enums = require('../constants/enum');

const { Schema } = mongoose;

const optionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new Schema({
  slug: {
    type: String,
    requred: true,
  },
  question: {
    type: String,
    minLength: 6,
    maxLength: 500,
    required: true,
  },
  ipDupCheck: {
    type: String,
    default: Enums.DUP_CHECK.IP_DUP_CHECK,
    enum: [
      Enums.DUP_CHECK.IP_DUP_CHECK,
      Enums.DUP_CHECK.BROWSER_COOKIE_DUP_CHECK,
      Enums.DUP_CHECK.NO_DUP_CHECK,
    ],
  },
  multi: {
    type: Boolean,
    default: false,
  },
  captcha: {
    type: Boolean,
    default: false,
  },
  options: [optionSchema],
  createdAt: {
    type: Date,
    default: new Date(),
    get: (v) => dayjs(v).format('MM/DD/YYYY HH:mm'),
  },
});

pollSchema.methods.vote = async function vote({ options, ip }) {
  if (!this.multi && Array.isArray(options)) {
    throw new Error('Multiple option is not allowed for this poll.');
  }

  const optionArr = Array.isArray(options) ? options : [options];
  const votes = [];

  optionArr.forEach((id) => {
    const option = this.options.id(id);
    option.voteCount += 1;

    votes.push({
      optionId: id,
      ip,
    });
  });

  await Vote.insertMany(votes);
  await this.save();
};

pollSchema.virtual('totalVote').get(function () {
  return this.options.reduce((acc, option) => {
    return acc + option.voteCount;
  }, 0);
});

module.exports = mongoose.model('Poll', pollSchema);
