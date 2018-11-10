/**
 * @Author: nilanjan
 * @Date:   2018-09-27T00:47:28+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: index.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T12:42:22+05:30
 * @Copyright: Nilanjan Daw
 */



var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slack' });
});

module.exports = router;
