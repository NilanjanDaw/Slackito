/**
 * @Author: nilanjan
 * @Date:   2018-10-04T15:39:00+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: users.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-10-04T16:25:13+05:30
 * @Copyright: Nilanjan Daw
 */



var express = require('express');
const models = require('.././models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('.././config');
var router = express.Router();

router.post('/login', function (req, res, next) {
  let password = req.body.password
  let username = req.body.username
  let workspace_id = req.body.workspace_id
  if(username && password && workspace_id){
    models.user.findOne({
      where: {
        username, workspace_id
      }
    }).then(user => {
      bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
          var payload = {
            username: user.username,
            workspace_id: user.workspace_id
          };
          var token = jwt.sign(payload, config.jwt_secret);
          res.status(200).json({status: "success", token: token});
        } else {
          res.status(401).json({status: "authentication failed"})
        }
      });
    }).catch(error => {
      res.status(401).json({status: "authentication failed"})
    })
  } else {
    res.status(401).json({status: "authentication failed"})
  }
})

router.post('/register', function (req, res, next) {
  
})

module.exports = router;
