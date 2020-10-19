function homeController(req, res) {
  return res.render('index', { title: 'Pollermo' });
}

module.exports = homeController;
