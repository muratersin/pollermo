function pollPageController(req, res) {
  const { poll } = req;

  res.render('poll', {
    poll,
    TITLE: poll.question,
    DESCRIPTION: poll.description,
  });
}

module.exports = pollPageController;
