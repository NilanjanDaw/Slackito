/**
 * @Author: nilanjan
 * @Date:   2018-10-04T16:51:37+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: channel.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-10T17:11:50+05:30
 * @Copyright: Nilanjan Daw
 */
 var express = require('express');
 const models = require('.././models');
 var router = express.Router();
 const config = require('.././config');
 const passport = require('passport');

router.post('/new', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  if (req.user.is_admin) {
    models.channel.create({
      channel_name: req.body.channel_name,
      workspace_id: req.user.workspace_id
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
  } else {
    req.status(401).json({
      status: "unauthorized"
    })
  }
})

router.get('/list', passport.authenticate('jwt', { session: false }), function (req, res, next) {

  if (req.user.is_admin) {
    models.channel.findAll({
      where: {
        workspace_id: req.user.workspace_id
      }
    }).then(channels => {
      res.json({
        status: "success",
        data: channels
      }).then(err => {
        console.log(err);
        res.status(400).json({
          status: "failed"
        })
      })
    })
  } else {
    const Op = models.Sequelize.Op
    models.channeluser.findAll({
      where: {
        user_id: req.user.id
      }
    }).then(channelusers => {
      channel_id = []
      for (channeluser of channelusers) {
        channel_id.push(channeluser.channel_id)
      }

      models.channel.findAll({
        where: {
          channel_id: {
            [Op.or]: channel_id
          }
        }
      }).then(channels => {
        res.json({
          status: "success",
          data: channels
        })
      })
    }).catch(err => {
      console.log(err);
      res.status(400).json({
        status: "failed"
      })
    })
  }

})

 module.exports = router;
