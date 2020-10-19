function resultPageController(req, res) {
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
}

module.exports = resultPageController;
