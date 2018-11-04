/**
 * @Author: nilanjan
 * @Date:   2018-10-04T16:51:37+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: channel.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-04T18:06:31+05:30
 * @Copyright: Nilanjan Daw
 */
 var express = require('express');
 const models = require('.././models');
 var router = express.Router();
 const config = require('.././config');
 const passport = require('passport');

router.post('/new', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  models.channel.create({
    channel_name: req.body.channel_name,
    workspace_id: req.body.workspace_id
  }).then(channel => {
    res.json({
      status: "success",
      channel
    })
  }).catch(error => {
    res.status(400).json({
      status: "failed",
    })
  })
})

router.get('/list', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  models.channel.findAll({
    where: {
      workspace_id: req.query.workspace_id
    }
  }).then(channels => {
    data = []
    for (channel of channels) {
      data.push(channel.dataValues)
    }
    res.json({
      status: "success",
      details: data
    })
  }).catch(err => {
    console.log(err);
    res.status(400).json({
      status: "failed"
    })
  })
})

 module.exports = router;
