function createPageController(req, res) {
  res.render('create', {
    errorMessage: [],
  });
}

module.exports = createPageController;
