'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');


app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));

app.use(session({
	secret: 'lisascargoshorts<3'
}));

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use('/api', require('../api/api.router'));

app.use('/auth', require('../api/auth/auth.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});


app.use(require('./statics.middleware'));
app.use(require('./error.middleware'));

module.exports = app;
