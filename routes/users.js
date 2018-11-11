/**
 * @Author: nilanjan
 * @Date:   2018-10-04T15:39:00+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: users.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-11T16:19:04+05:30
 * @Copyright: Nilanjan Daw
 */



const express = require('express');
const models = require('.././models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('.././config');
const passport = require('passport');
let router = express.Router();

let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'slackitoslack@gmail.com',
        pass: 'cs699slack'
    }
});


router.post('/invite', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  let inviteMail = req.body.email_id
  let channel_name = req.body.channel_name
  console.log(req.body);
  let token = jwt.sign({
    invite_mail: inviteMail,
    workspace_id: req.user.workspace_id,
    channel_name
  }, config.jwt_secret)
  const mailOptions = {
    from: 'slackitoslack@gmail.com',
    to: inviteMail,
    subject: 'Invitation to Slackito',
    html: `<p> Hi! <b>${inviteMail}</b>, <br />
    ${req.user.username} has invited you to join his <b>${req.user.workspace_id}</b> workspace on Slackito.
    Please click on the link below to accept the invitation. <br />
    http://${config.server_url}/users/invite/accept?token=${token}</p> <br />
    Thanks, <br/>
    Team <b>Slackito<b>`
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err) {
       console.log(err);
       res.status(400).json({
         "status": "failed",
         "message": err
       })
     }
     else {
       res.json({
         "status": "success"
       })
       console.log(info);
     }
   });
})

router.get('/invite/accept', function (req, res, next) {

  jwt.verify(req.query.token, config.jwt_secret, function(err, decoded) {
    if (err) {
      res.status(401).json({
        status: "authentication failed"
      })
    } else {
      res.render('invite.handlebars', {
        email_id: decoded.invite_mail,
        workspace_id: decoded.workspace_id,
        channel_name: decoded.channel_name
      })
    }
  })
})

router.post('/confirm', function (req, res, next) {
  let token = jwt.sign(req.body.email_id, config.jwt_secret);
  const mailOptions = {
    from: 'slackitoslack@gmail.com',
    to: req.body.email_id,
    subject: 'Email Verification for Slackito',
    html: `<p>Please click on the link here http://${config.server_url}/users/verify?token=${token}</p>`,// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err) {
       console.log(err);
       res.json({
         "status": "failed",
         "message": err
       })
     }
     else {
       res.json({
         "status": "success"
       })
       console.log(info);
     }
   });
})

router.get('/verify', function (req, res, next) {
  jwt.verify(req.query.token, config.jwt_secret, function(err, decoded) {
    if (err) {
      res.status(401).json({
        status: "authentication failed"
      })
    } else {
      models.user.findAll({
        where: {
          email_id: decoded
        },
        attributes: ['workspace_id', 'username']
      }).then(users => {
        data = []
        for (user of users) {
          data.push(user.dataValues)
        }

        let token = jwt.sign({
          email_id: decoded,
          confirm: true
        }, config.jwt_secret);
        res.json({
          status: "success",
          details: data,
          token
        })
      }).catch(err => {
        console.log(err);
        res.status(500)
      })
    }
  });
})



router.post('/login', function (req, res, next) {
  let password = req.body.password
  let email_id = req.body.email_id
  let workspace_id = req.body.workspace_id
  if(email_id && password && workspace_id){
    models.user.findOne({
      where: {
        email_id, workspace_id
      }
    }).then(user => {
      bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
          user = user.dataValues
          delete user.password
          let token = jwt.sign(user, config.jwt_secret);
          let payload = user
          payload.token = token
          payload.status = "success"
          models.user.findAll({
            where: {
              email_id
            },
            attributes: ['workspace_id', 'username']
          }).then(users => {
            payload.details = users
            res.json(payload)
          })
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

router.post('/join', function (req, res, next) {
  
  let username = req.body.username
  let workspace_id = req.body.workspace_id
  let email_id = req.body.email_id
  let password = req.body.password
  let channel_name = req.body.channel_name
  if(username && workspace_id && email_id && password) {
    bcrypt.hash(password, config.salt_rounds, function(err, hash) {
      models.user.findOrCreate({defaults: {
        username, workspace_id, email_id, password: hash
      }, where: {
        email_id, workspace_id
      }}).spread((user, created) => {

        models.channel.findOne({
          where: { workspace_id, channel_name }
        }).then(channel => {
          models.channeluser.findOrCreate({
            where: { user_id: user.id, channel_id: channel.id }
          }).spread((channeluser, created) => {
            models.channel.findOrCreate({
              where: { workspace_id, channel_name: username }
            }).spread((channel, created) => {
              models.channeluser.findOrCreate({
                where: { channel_id: channel.id, user_id: user.id }
              }).spread((channeluser, created) => { res.render('success.handlebars', { username }) })
            })
          })


        })
      }).catch(error => {
        console.log(error);
        res.status(400).json({
          status: "failed",
          message: "user account not created " + err.parent.detail
        })
      })
    })
  } else {
    res.status(400).json({
      status: "failed",
      message: "bad request"
    })
  }
})

router.post('/password/set', function (req, res, next) {
  if(req.body.email_id && req.body.workspace_id && req.body.password){
    let email_id = req.body.email_id;
    let password = req.body.password;
    let workspace_id = req.body.workspace_id;
    console.log(req.body);
    bcrypt.hash(password, config.salt_rounds, function(err, hash) {
        models.user.update({
          password: hash
        }, {
            where: {
            email_id, workspace_id
          }
        }).then(user =>{
          res.json({
            status: "success"
          })
        }).catch(error => {
          console.log(error);
          res.status(400).json({
            status: "failed",
            message: "unable to set password"})
        })
    });
  } else {
    res.status(400).json({
      status: "failed",
      message: "bad request"
    })
  }
})

module.exports = router;
