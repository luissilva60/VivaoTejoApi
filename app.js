var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const utilizador = require('./routes/utilizadores');

const embarcacao = require('./routes/embarcacoes');

const eventos = require('./routes/eventos');

const artigos = require('./routes/artigos');

const cais = require('./routes/cais');

var app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/    ', indexRouter)
app.use('/users', usersRouter)


/*                   USER                */
app.get('/api/utilizador', utilizador.getUsers)
app.get('/api/utilizador/:id(\\d+)',utilizador.getUser)

/*                   EMBARCACOES               */
app.get('/api/embarcacao', embarcacao.getEmbarcacoes)
app.get('/api/embarcacao/:id(\\d+)',embarcacao.getEmbarcacao)
app.post('/api/embarcacao', embarcacao.addEmbarcacao)
app.delete('/api/embarcacao/:id(\\d+)',embarcacao.deleteEmbarcacao)
app.put('/api/embarcacao', embarcacao.updateEmbarcacao)

/*                  EVENTOS              */
app.get('/api/eventos', eventos.getEventos)
app.get('/api/eventos/:id(\\d+)',eventos.getEvento)

/*                 ARTIGOS             */
app.get('/api/artigos', artigos.getArtigos)
app.get('/api/artigos/:id(\\d+)',artigos.getArtigo)


/*                 CAIS            */
app.get('/api/cais', cais.getCais)
app.get('/api/cais/:id(\\d+)',cais.get1Cais)


module.exports = app;
