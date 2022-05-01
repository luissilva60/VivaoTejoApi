var express = require('express');
var router = express.Router();
var embarcacoesModel = require('../models/embarcacoes')

router.get('', async function(req, res, next) {
    console.log("[embarcacoesRoutes] Retrieving all boats");
    let result = await embarcacoesModel.getEmbarcacoes();
    res.status(result.status).send(result.data);

});

module.exports = router;
