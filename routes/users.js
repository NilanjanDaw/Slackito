/**
 * @Author: nilanjan
 * @Date:   2018-10-04T15:39:00+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: users.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-04T03:21:47+05:30
 * @Copyright: Nilanjan Daw
 */



const express = require('express');
const models = require('.././models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('.././config');
let router = express.Router();

let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'slackitoslack@gmail.com',
        pass: 'cs699slack'
    }
});

router.post('/confirm', function (req, res, next) {
  let token = jwt.sign(req.body.email_id, config.jwt_secret);
  const mailOptions = {
    from: 'slackitoslack@gmail.com',
    to: req.body.email_id,
    subject: 'Email Verification for Slackito',
    html: `<p>Please click on the link here http://10.1.192.9:3000/users/verify?token=${token}</p>`,// plain text body
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
        res.json({
          status: "success",
          details: data
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
          let payload = {
            email_id: user.email_id,
            workspace_id: user.workspace_id
          };
          let token = jwt.sign(payload, config.jwt_secret);
          res.status(200).json({
            status: "success",
            email_id: user.email_id,
            workspace_id: user.workspace_id,
            username: user.username,
            token: token
          });
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
  let username = req.body.username
  let workspace_id = req.body.workspace_id
  let email_id = req.body.email_id
  if(username && workspace_id && email_id){
    models.user.create({
      username, workspace_id, email_id
    }).then(user => {
      res.json({
        status: "success",
        user
      })
    }).catch(error => {
      console.log(error);
      res.status(400).json({
        status: "failed",
        message: "user account not created"
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
    bcrypt.hash(password, config.salt_rounds, function(err, hash) {
        models.user.update({
          password: hash
        }, {
            where: {
            email_id, workspace_id
          }
        }).then(user =>{
          res.json({
            status: "successs"
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
