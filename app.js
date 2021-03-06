/**
 * @Author: nilanjan
 * @Date:   2018-09-27T00:47:28+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: app.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-11T06:29:21+05:30
 * @Copyright: Nilanjan Daw
 */



var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var helmet = require('helmet');
const config = require('./config.json');
var broker = require('./broker')
const models = require('./models');
var exphbs  = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var workspaceRouter = require('./routes/workspace');
var channelRouter = require('./routes/channel');
var messageRouter = require('./routes/messages');
var app = express();

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("token");
jwtOptions.secretOrKey = config.jwt_secret;

var strategy = new JwtStrategy(
  jwtOptions, function (jwt_payload, next) {
      models.user.findOne({
        where: {
          email_id: jwt_payload.email_id,
          workspace_id: jwt_payload.workspace_id
        }
      }).then(user => {
        next(null, user)
      }).catch(error => {
        console.error(error);
        next(null, false);
      })
});

passport.use(strategy)
app.use(helmet())
app.use(passport.initialize())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'pug');
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workspaces', workspaceRouter);
app.use('/channels', channelRouter);
app.use('/messages', messageRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.pug');
});

console.log("HTTP server is up and running");

module.exports = app;
