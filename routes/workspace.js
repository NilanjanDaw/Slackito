/**
 * @Author: nilanjan
 * @Date:   2018-10-04T16:51:37+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: workspace.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-11T00:24:37+05:30
 * @Copyright: Nilanjan Daw
 */
 var express = require('express');
 const models = require('.././models');
 var router = express.Router();
 const config = require('.././config');
 const bcrypt = require('bcrypt');
 const passport = require('passport');
 const jwt = require('jsonwebtoken');

router.post('/new', function (req, res, next) {
  jwt.verify(req.query.token, config.jwt_secret, function(err, decoded) {

    if (err) {
      res.status(401).json({
        status: "authentication failed"
      })
    } else {
      if (decoded.confirm == true || decoded.workspace_id) {
        models.workspace.create({
          workspace_id: req.body.workspace_id
        }).then(workspace => {
          bcrypt.hash(req.body.password, config.salt_rounds, function(err, hash) {
            models.user.create({
              email_id: decoded.email_id,
              workspace_id: workspace.workspace_id,
              username: req.body.username,
              password: hash,
              is_admin: true
            }).then(user => {
              user = user.dataValues
              delete user.password
              let token = jwt.sign(user, config.jwt_secret);
              let payload = user
              payload.token = token
              payload.status = "success"
              models.user.findAll({
                where: {
                  email_id: decoded.email_id
                },
                attributes: ['workspace_id', 'username']
              }).then(users => {
                payload.details = users
                res.json(payload)
              })
            })
          });
        }).catch(err => {
          console.log(err.parent.detail);
          res.status(400).json({
            status: "failed",
            message: err.parent.detail
          })
        })
      }
    }
  })
})

router.get('/list', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  models.user.findAll({
    where: {
      email_id: req.user.email_id
    },
    attributes: ['workspace_id', 'username']
  }).then(users => {
    data = []
    for (user of users) {
      data.push(user.dataValues)
    }
    res.json({
      status: "success",
      details: data
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: err.parent.detail
    })
  })
})

 module.exports = router;
