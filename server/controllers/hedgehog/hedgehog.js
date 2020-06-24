const express = require('express');
const router = express.Router();
const enemies = require('../../data/enemies');
let users =  require('../../data/users');

router.get('/hedgehog/index', (req, res, next) => {
  console.log(req.path)
  res.render('index', { title: 'Hedgehog', enemies });
});

router.get('/hedgehog/enemies', (req, res, next) => {
  console.log(req.path)
  res.render('enemies', { title: 'Enemies', enemies });
});

router.get('/hedgehog/enemies/:id', (req, res, next) => {
  console.log(req.path)
  const id = +req.params.id;
  console.log(id)
  const enemy = enemies.find(e=> e.id === id) 
  console.log(enemy)
  res.render('enemy', { title: 'Enemy', enemy });
});

router.post('/hedgehog/register', (req, res, next)=> {
  const { body} = req;
  console.log(body)
  users.push(body);
  res.redirect('/hedgehog/index')
})
module.exports = router;