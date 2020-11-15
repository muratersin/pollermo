function pollPageController(req, res) {
  const { poll } = req;

  res.render('poll', {
    poll,
    TITLE: `Poll - ${poll.question}`,
    DESCRIPTION: `Poll - ${poll.description}`,
  });
}

module.exports = pollPageController;
