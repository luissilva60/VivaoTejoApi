var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var embarcacoesRouter = require('./routes/embarcacoesRoutes')
var utilizadoresRouter = require('./routes/utilizadoresRoutes')
var eventosRouter = require('./routes/eventosRoutes')
var caisRouter = require('./routes/caisRoutes')
var artigosRouter = require('./routes/artigosRoutes')


var app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/*                   USER                */
app.use('/api/user', utilizadoresRouter)

/*                   EMBARCACOES               */
app.use('/api/embarcacao', embarcacoesRouter)

/*                  EVENTOS
app.use('/api/eventos', eventosRouter)*/

/*                 ARTIGOS
app.use('/api/artigos', artigosRouter)*/

/*                 CAIS
app.use('/api/cais', caisRouter)*/

module.exports = app;
