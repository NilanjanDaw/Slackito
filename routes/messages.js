/**
 * @Author: nilanjan
 * @Date:   2018-11-10T16:06:38+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: messages.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-13T14:17:46+05:30
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

router.post('/files/upload', upload.single('file'),
     passport.authenticate('jwt', { session: false }), function (req, res, next) {
  console.log(req.file);
  if (file)
    models.file.create({
      message_id: req.body.message_id,
      filename: req.file.originalname,
      filehash: req.file.filename
    }).then(file => {
      res.json({
        status: "success"
      })
    })
  else {
    res.status(400).json({
      status: "failed"
    })
  }
})

router.get('/files/download/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  models.file.findOne({
    where: {
      message_id: req.query.message_id
    }
  }).then(file => {
    res.download('uploads/' + file.filehash, file.filename)
  })
})

router.post('/all', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  models.message.findAll({
    where: {
      workspace_id: req.user.workspace_id,
      channel_name: req.body.channel_name
    }
  }).then(messages => {
    res.json({
      status: "success",
      messages: messages
    })
  })
})

router.post('/users/all', passport.authenticate('jwt', { session: false }), function (req, res, next) {

  let query = `select * from messages where workspace_id='${req.user.workspace_id}' and
      channel_name='${req.body.channel_name}' and "from"='${req.user.username}' or
      channel_name='${req.user.username}' and "from"='${req.body.channel_name}' order by "createdAt"`
  models.sequelize.query(query,
      { type: models.sequelize.QueryTypes.SELECT}).then(messages => {
        res.json({
          status: "success",
          messages: messages
        })
      })
})

router.post('/update', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  models.message.update({body: req.body.body}, {
    returning: true,
    where: {
      id: req.body.id
    }
  }).then(function ([rowsUpdated, [updatedMessages]]) {
    res.json({
      status: "success",
      updatedMessages
    })

  }).catch(err => {
    res.status(400).json({
      status: "failed",
      details: err.parent.detail
    })
  })
})

router.post('/delete', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  models.message.destroy({
    where: {
      id: req.body.id
    }
  }).then(deleted => {
    res.json({
      status: "success",
      deleted
    })
  }).catch(err => {
    res.status(400).json({
      status: "failed",
      details: err.parent.detail
    })
  })
})

module.exports = router;
