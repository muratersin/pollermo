function pollPageController(req, res) {
  const { poll } = req;
  
  res.render('poll', {
    poll,
    title: `Poll - ${poll.question}`,
  });
}

module.exports = pollPageController;
