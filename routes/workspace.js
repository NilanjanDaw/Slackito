/**
 * @Author: nilanjan
 * @Date:   2018-10-04T16:51:37+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: workspace.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-10-04T16:55:04+05:30
 * @Copyright: Nilanjan Daw
 */
 var express = require('express');
 const models = require('.././models');
 var router = express.Router();

router.post('/new', function (req, res, next) {
  models.workspace.create({
    workspace_id: req.body.workspace_id
  }).then(workspace => {
    res.json({
      status: "success",
      workspace_id: workspace.workspace_id
    })
  }).catch(err => {
    res.status(400).json({
      status: "failed"
    })
  })
})

 module.exports = router;
