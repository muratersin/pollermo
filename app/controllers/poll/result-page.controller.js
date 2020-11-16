function resultPageController(req, res) {
  const { poll } = req;

  poll.options = poll.options.map((o) => {
    const option = o;
    const totalVote = poll.totalVote || 1;
    option.percent = ((option.voteCount * 100) / totalVote).toFixed(2).replace('.00', '');
    return option;
  });

  res.render('result', {
    poll,
    TITLE: poll.question,
    DESCRIPTION: poll.description,
  });
}

module.exports = resultPageController;
