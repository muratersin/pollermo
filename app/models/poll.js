/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Vote = require('./vote');
const Enums = require('../constants/enum');
const { verifyCaptchaToken } = require('../utils/helpers');

const { Schema } = mongoose;

const optionSchema = new Schema({
  text: {
    type: String,
    required: [true, "Option can't be null"],
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
    minlength: [6, 'The question must be at least 6 characters long'],
    maxLength: [500, 'The question must be maximım 500 characters long'],
    required: [true, "Question can't be null"],
  },
  dupcheck: {
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
  options: {
    type: [optionSchema],
    validate: {
      validator() {
        return !(this.options.length < 2 || this.options.length > 40);
      },
      message: () =>
        "Option count must be at least 2 or a maximum of 40 and can't contain the duplicate value.",
    },
  },
  createdAt: {
    type: Date,
    default: dayjs().valueOf(),
    get: (v) => dayjs(v).format('MM/DD/YYYY HH:mm'),
  },
});

pollSchema.methods.vote = async function vote({
  options,
  ip,
  token,
  cookieVotedPolls = [],
}) {
  if (!this.multi && Array.isArray(options)) {
    throw new Error('Multiple option is not allowed for this poll.');
  }

  if (this.captcha) {
    const isSuccess = await verifyCaptchaToken(token);
    if (!isSuccess) {
      return 'Request was rejected.';
    }
  }

  const optionArr = Array.isArray(options) ? options : [options];
  if (this.dupcheck === Enums.DUP_CHECK.IP_DUP_CHECK) {
    const existisVotes = await Vote.findOne({ ip, pollId: this._id }).exec();
    if (existisVotes) {
      return 'You have already voted on this poll.';
    }
  }

  if (this.dupcheck === Enums.DUP_CHECK.BROWSER_COOKIE_DUP_CHECK) {
    if (cookieVotedPolls.includes(this._id.toString())) {
      return 'You have already voted on this poll.';
    }
  }

  const votes = [];
  optionArr.forEach((id) => {
    const option = this.options.id(id);
    option.voteCount += 1;

    votes.push({
      pollId: this._id,
      optionId: id,
      ip,
    });
  });

  await Vote.insertMany(votes);
  await this.save();
};

pollSchema.virtual('totalVote').get(function totalVote() {
  return this.options.reduce((acc, option) => acc + option.voteCount, 0);
});

pollSchema.virtual('url').get(function totalVote() {
  return `poll/${this.slug}`;
});

pollSchema.virtual('resultUrl').get(function totalVote() {
  return `poll/${this.slug}/result`;
});

pollSchema.virtual('ipDupCheckTitle').get(function totalVote() {
  switch (this.dupcheck) {
    case Enums.DUP_CHECK.IP_DUP_CHECK:
      return 'IP Duplication Checking';

    case Enums.DUP_CHECK.BROWSER_COOKIE_DUP_CHECK:
      return 'Browser Cookie Duplication Checking';

    default:
      return 'No Duplication Checking';
  }
});

module.exports = mongoose.model('Poll', pollSchema);
