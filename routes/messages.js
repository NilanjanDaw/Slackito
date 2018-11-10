/**
 * @Author: nilanjan
 * @Date:   2018-11-10T16:06:38+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: messages.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T16:47:25+05:30
 * @Copyright: Nilanjan Daw
 */

var express = require('express');
var multer  = require('multer')
const models = require('.././models');
const config = require('.././config');
const passport = require('passport');
var router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function (req, file, callback) {
    let filename = Date.now().toString() + "-" + file.originalname
    callback(null, filename)
  }
})

const upload = multer({storage})

router.post('/files/upload', upload.single('file'), function (req, res, next) {
  console.log(req.file);
  res.json({
    status: "success"
  })
})

router.post('/files/download', function (req, res, next) {
  res.download('uploads/' + req.body.filename)
})

module.exports = router;
