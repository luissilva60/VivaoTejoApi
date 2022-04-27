var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const utilizador = require('./routes/utilizadores');

const embarcacao = require('./routes/embarcacoes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/    ', indexRouter);
app.use('/users', usersRouter);
/*                   USER                */
app.get('/api/users', utilizador.getUsers);
app.get('/api/users/:id(\\d+)',utilizador.getUser)


app.get('/api/embarcacoes', embarcacao.getEmbarcacoes);
app.get('/api/embarcacoes/:id(\\d+)',embarcacao.getEmbarcacao)


module.exports = app;
