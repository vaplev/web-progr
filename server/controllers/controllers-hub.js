const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const endpoints = [
  require('./hedgehog/hedgehog'),
  
];


router.use(bodyParser.urlencoded({ extended: false }))
//app.set('views', path.join(__dirname, 'views'));


endpoints.forEach(api=> {
  router.use(api)
});


module.exports = router;