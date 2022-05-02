var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');









var app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/*                   USER                      */
var utilizadoresRouter = require('./routes/utilizadoresRoutes')
app.use('/api/user', utilizadoresRouter)

/*                   EMBARCACOES               */
var embarcacoesRouter = require('./routes/embarcacoesRoutes')
app.use('/api/embarcacao', embarcacoesRouter)

/*                  EVENTOS                    */
var eventosRouter = require('./routes/eventosRoutes')
app.use('/api/eventos', eventosRouter)

/*                 ARTIGOS
var artigosRouter = require('./routes/artigosRoutes')
app.use('/api/artigos', artigosRouter)*/

/*                 CAIS
var caisRouter = require('./routes/caisRoutes')
app.use('/api/cais', caisRouter)*/

module.exports = app;
