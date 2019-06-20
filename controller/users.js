var users = require('../model/users')

const index = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10)
  //console.log('limit=', limit);
  if(Number.isNaN(limit)) {
    res.status(400).end();
  }
  else {
    res.json(users.slice(0, limit));
  }
}

const show = (req, res) => {
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
}

const destroy = (req, res) => {
  console.log('req.params=', req.params);
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) {
    res.status(400).end();
  }
  else {
    users = users.filter(user => user.id !== id)
    res.status(204).end();
  }
}

const create = (req, res) => {
  const name = req.body.name;

  if(name == undefined) {
    return res.status(400).end();
  }

  const found = users.filter(user => user.name === name).length
  if(found) { // 중복
    return res.status(409).end();
  }
  /*const found = users.find(user => user.name === name)
  if(found !== undefined) { // 중복
  return res.status(409).end();
  }*/

  // 신규
  const id = Date.now();
  const user = {id, name};
  //users.push(user); // 원래는 이 코드가 맞으나, npm test 에서 계속 오류가 발생
  users[users.length] = user;
  return res.status(201).json(user);
}

module.exports = {
  index,
  show,
  destroy,
  create
}