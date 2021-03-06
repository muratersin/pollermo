const Poll = require('../../models/poll');
const { getMongooseErrorMessages, makeUniqueArray } = require('../../utils/misc');

function createPageController(req, res) {
  const {
    question,
    dupcheck,
    options,
    multi,
    captcha,
  } = req.body;

  const poll = new Poll({
    question,
    dupcheck,
    captcha: captcha === 'on',
    multi: multi === 'on',
  });

  poll.options = makeUniqueArray(options)
    .filter((o) => o)
    .map((o) => ({
      text: o,
    }));

  poll.save((err) => {
    if (err) {
      return res.render('create', {
        errorMessages: getMongooseErrorMessages(err),
      });
    }

    res.redirect(`/${poll._id}`);
  });
}

module.exports = createPageController;
