var express = require('express');
var router = express.Router();
var embarcacoesModel = require('../models/embarcacoes')

router.get('/api/embarcacao', async function(req, res, next) {
    console.log("[embarcacoesRoutes] Retrieving all boats");
    let result = await embarcacoesModel.getEmbarcacoes();
    res.status(result.status).send(result.data);

});
