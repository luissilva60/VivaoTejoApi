var express = require('express');
var router = express.Router();
var embarcacoesModel = require('../models/embarcacoes')

router.get('', async function(req, res, next) {
    console.log("[embarcacoesRoutes] Retrieving all boats");
    let result = await embarcacoesModel.getEmbarcacoes();
    res.status(result.status).send(result.data);

});
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[embarcacoesRoutes] boat with id: "+ id);
    let result = await embarcacoesModel.getEmbarcacao(id);
    res.status(result.status).send(result.data);

});

router.post('', async function(req, res, next) {
    let embarcacao = req.body;
    console.log("[embarcacoesRoutes] Saving boat " + JSON.stringify(newProduct));
    let result = await embarcacoesModel.addEmbarcacao(embarcacao);
    res.status(result.status).send(result.data);

});
module.exports = router;
