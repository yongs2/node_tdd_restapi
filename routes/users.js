var express = require('express');
var router = express.Router();
const users = require('../model/users')

/* GET users listing. */
router.get('/', (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10)
  //console.log('limit=', limit);
  if(Number.isNaN(limit)) {
    res.status(400).end();
  }
  else {
    res.json(users.slice(0, limit));
  }
});

router.get('/:id', (req, res) => {
  console.log('req.params=', req.params);
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) {
    res.status(400).end();
  }
  else {
    const user = users.filter(user => user.id === id)[0]
    if(user == undefined) {
      res.status(404).end();
    }
    else {
      res.json(user);
    }
  }
});

module.exports = router;
