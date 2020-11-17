const Poll = require('../../models/poll');
const { getPaginationMeta } = require('../../utils/misc');

async function listPageController(req, res, next) {
  try {
    const { q, p } = req.query;
    const page = Number(p || 1);
    const query = {};
    const limit = 10;
    const skip = (page - 1) * limit;

    if (q) {
      query.question = { $regex: q, $options: 'i' };
    }

    let polls = [];
    const total = await Poll.countDocuments(query).exec();
    if (total > 0) {
      polls = await Poll.find(query).sort('-createdAt').skip(skip).limit(limit).exec();
    }

    const pages = getPaginationMeta({
      total,
      page,
      limit,
      query: req.query,
    });

    res.render('list', {
      polls,
      title: 'Pollermo - List',
      meta: { pages },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = listPageController;
