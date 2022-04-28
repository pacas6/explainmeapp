var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var fundosRouter = require('./routes/fundosRout')
var usersRouter = require('./routes/usersRout')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // usa para poder acessar a pasta public

app.use('/', indexRouter);
app.use('/api/fundos', fundosRouter);
app.use('https://explainmeapp.herokuapp.com/api/users',usersRouter)

module.exports = app;
