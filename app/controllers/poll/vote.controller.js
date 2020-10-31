const Enums = require('../../constants/enum');

async function voteController(req, res, next) {
  try {
    const { poll } = req;
    const { options, token } = req.body;
    const cookieVotedPolls = req.cookies.votedPolls || [];
    const ip = req.headers['x-real-ip'] || req.ip;

    const errorMessage = await poll.vote({
      ip,
      options,
      token,
      cookieVotedPolls,
    });

    if (errorMessage) {
      return res.render('poll', {
        errorMessage,
        poll,
        title: `Poll - ${poll.question}`,
      });
    }

    if (poll.dupcheck === Enums.DUP_CHECK.BROWSER_COOKIE_DUP_CHECK) {
      // eslint-disable-next-line no-underscore-dangle
      res.cookie('votedPolls', [...cookieVotedPolls, poll._id]);
    }

    res.redirect(`/poll/${poll.slug}/result`);
  } catch (err) {
    next(err);
  }
}

module.exports = voteController;
