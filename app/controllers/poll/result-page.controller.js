function resultPageController(req, res) {
  const { poll } = req;

  poll.options = poll.options.map((o) => {
    const option = o;
    const totalVote = poll.totalVote || 1;
    option.percent = Math.round((option.voteCount * 100) / totalVote);
    return option;
  });

  res.render('result', {
    poll,
    title: `Poll Result - ${poll.question}`,
  });
}

module.exports = resultPageController;
