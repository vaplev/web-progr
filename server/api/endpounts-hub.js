const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const endpoints = [
  require('./test/test')
];
router.use(bodyParser.json())
endpoints.forEach(api=> {
  router.use('/api',api)
});


module.exports = router;