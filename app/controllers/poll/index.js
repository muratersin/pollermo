const createPageController = require('./create-page.controller');
const resultPageController = require('./result-page.controller');
const pollPageController = require('./poll-page.controller');
const listController = require('./list-page.controller');
const resultStreamController = require('./result-stream.controller');

const createController = require('./create.controller');
const voteController = require('./vote.controller');

module.exports = {
  createController,
  createPageController,
  resultPageController,
  pollPageController,
  listController,
  voteController,
  resultStreamController,
};
