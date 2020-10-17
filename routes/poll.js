const express = require('express');
const snakeCase = require('lodash.snakecase');

const findPollBySlug = require('../middlewares/find-poll-by-slug');
const Poll = require('../models/poll');
const { getMongooseErrorMessages, makeUniqueArray } = require('../utils/misc');

const router = express.Router();

router.get('/', (req, res, err) => {
  const { q } = req.query;
  const query = {};

  if (q) {
    query.question = { $regex: q };
  }

  Poll.find(query, (err, polls) => {
    if (err) return next(err);

    res.render('list', {
      polls,
      title: 'Pollermo - List',
    });
  });
});

router.get('/create', (req, res) => {
  res.render('create', {
    errorMessage: [],
  });
});

router.post('/create', (req, res, next) => {
  const { question, dupcheck, options, multi, captcha } = req.body;
  const poll = new Poll({
    question,
    dupcheck,
    captcha: captcha === 'on',
    multi: multi === 'on',
  });

  const slug = `${snakeCase(question)}_${poll.id}`;

  poll.slug = slug;
  poll.options = makeUniqueArray(options)
    .filter((o) => o)
    .map((o) => ({
      text: o,
    }));

  poll.save((err) => {
    if (err) {
      return res.render('create', {
        errorMessages: getMongooseErrorMessages(err),
      });
    }

    res.redirect(`/poll/${slug}`);
  });
});

router.post('/vote', async (req, res, next) => {
  try {
    const { pollId, options } = req.body;
    const poll = await Poll.findById(pollId).exec();

    await poll.vote({
      options,
      ip: req.ip,
    });

    res.redirect(`/poll/${poll.slug}/result`);
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', findPollBySlug, (req, res) => {
  const { poll } = req;

  res.render('poll', {
    poll,
    title: `Poll - ${poll.question}`,
  });
});

router.get('/:slug/result', findPollBySlug, (req, res) => {
  const { poll } = req;

  poll.options = poll.options.map((o) => {
    const option = o;
    option.percent = Math.round((option.voteCount * 100) / poll.totalVote);
    return option;
  });

  res.render('result', {
    poll,
    title: `Poll Result - ${poll.question}`,
  });
});

module.exports = router;
