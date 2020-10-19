/* eslint-disable no-underscore-dangle */
const express = require('express');

const findPollBySlug = require('../middlewares/find-poll-by-slug');

const poll = require('../controllers/poll');

const router = express.Router();

router.get('/', poll.listController);

router.get('/create', poll.createPageController);

router.post('/create', poll.createController);

router.post('/:slug', [findPollBySlug, poll.voteController]);

router.get('/:slug', [findPollBySlug, poll.pollPageController]);

router.get('/:slug/result', [findPollBySlug, poll.resultPageController]);

module.exports = router;
