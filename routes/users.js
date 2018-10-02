var express = require('express');
const models = require('.././models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  let password = req.body.password
  let username = req.body.username
  res.send("")
})

module.exports = router;
