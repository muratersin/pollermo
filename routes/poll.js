const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const pollList = [
    {
      question: 'What is your favorite color?',
      totalVote: 32,
      createdAt: '21/07/2020',
    },
    {
      question: 'What is your favorite color?',
      totalVote: 32,
      createdAt: '21/07/2020',
    },
    {
      question: 'What is your favorite color?',
      totalVote: 32,
      createdAt: '21/07/2020',
    },
    {
      question: 'What is your favorite color?',
      totalVote: 32,
      createdAt: '21/07/2020',
    },
    {
      question: 'What is your favorite color?',
      totalVote: 32,
      createdAt: '21/07/2020',
    },
  ];
  res.render('list', { title: 'Pollermo', pollList });
});

router.get('/create', (req, res) => {
  res.render('create', {
    errorMessage: null,
  });
});

router.post('/create', (req, res) => {
  console.log(req.body.option)

  res.render('create', {
    errorMessage: null,
  });
});

router.get('/:slug', (req, res) => {
  res.render('index')
})

module.exports = router;
