const express = require('express');

const findPollById = require('../middlewares/find-poll-by-id');
const isEmbeded = require('../middlewares/is-embeded');

const poll = require('../controllers/poll');
const Home = require('../controllers/home');

const router = express.Router();

router.get('/', Home.index);

router.get('/search', poll.listController);

router.get('/create', poll.createPageController);

router.post('/create', poll.createController);

router.get('/:id', [findPollById, isEmbeded, poll.pollPageController]);

router.post('/:id', [findPollById, poll.voteController]);

router.get('/:id/result', [findPollById, isEmbeded, poll.resultPageController]);

router.get('/:id/result-stream', [findPollById, poll.resultStreamController]);

module.exports = router;
