var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var embarcacoesRouter = require('./routes/embarcacoesRoutes')

var utilizadoresRouter = require('./routes/utilizadoresRoutes')

var app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/    ', indexRouter)
app.use('/users', usersRouter)


/*                   USER                */
app.use('/api/user', usersRouter)

/*                   EMBARCACOES               */
app.use('/api/embarcacao', embarcacoesRouter)

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
