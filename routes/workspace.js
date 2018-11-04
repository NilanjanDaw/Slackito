/**
 * @Author: nilanjan
 * @Date:   2018-10-04T16:51:37+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: workspace.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-04T14:34:59+05:30
 * @Copyright: Nilanjan Daw
 */
 var express = require('express');
 const models = require('.././models');
 var router = express.Router();
 const config = require('.././config');
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
              password: hash
            }).then(user => {
              let token = jwt.sign({
                email_id: user.email_id,
                workspace_id: user.workspace_id
              }, config.jwt_secret)
              res.json({
                status: "success",
                token
              })
            })
          });
        }).catch(err => {
          res.status(400).json({
            status: "failed"
          })
        })
      }
    }
  })
})

router.get('/list', function (req, res, next) {
  models.user.findAll({
    where: {
      email_id: req.query.email_id
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
    res.status(500)
  })
})

 module.exports = router;
