var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const utilizador = require('./routes/utilizadores');

const embarcacao = require('./routes/embarcacoes');

const eventos = require('./routes/eventos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/    ', indexRouter);
app.use('/users', usersRouter);


/*                   USER                */
app.get('/api/utilizador', utilizador.getUsers);
app.get('/api/utilizador/:id(\\d+)',utilizador.getUser)

/*                   EMBARCACOES               */
app.get('/api/embarcacao', embarcacao.getEmbarcacoes);
app.get('/api/embarcacao/:id(\\d+)',embarcacao.getEmbarcacao)

/*                  EVENTOS              */
app.get('/api/eventos', eventos.getEventos);
app.get('/api/eventos/:id(\\d+)',eventos.getEvento)



module.exports = app;
