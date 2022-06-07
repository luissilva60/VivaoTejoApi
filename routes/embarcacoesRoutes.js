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

router.post('/new', async function(req, res, next) {
    let embarcacao = req.body;
    console.log("[embarcacoesRoutes] Saving boat " + JSON.stringify(embarcacao));
    let result = await embarcacoesModel.addEmbarcacao(embarcacao);
    res.status(result.status).send(result.data);

});

router.delete('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[embarcacoesRoutes] Deleting boat with id: "+ id);
    let result = await embarcacoesModel.deleteEmbarcacao(id);
    res.status(result.status).send(result.data);

});

router.put('/update', async function(req, res, next) {
    let embarcacao = req.body;
    console.log("[embarcacoesRoutes] Updating boat " + JSON.stringify(embarcacao));
    let result = await embarcacoesModel.updateEmbarcacao(embarcacao);
    res.status(result.status).send(result.data);

});

router.get('/intersection', async function(req, res, next) {
    let id = req.params.id
    console.log("[embarcacoesRoutes] Retrieving all intersections in polygon in cais with :" + id);


    let result = await embarcacoesModel.getEmbarcacoesinPolygon(id);
    res.status(result.status).send(result.data);

});

router.get('/intersection/number/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[embarcacoesRoutes] Retrieving all intersections in polygon");
    let result = await embarcacoesModel.getNumberOfEmbarcacoesInPolygon(id);
    res.status(result.status).send(result.data);

});

router.get('/pending', async function(req, res, next) {
    console.log("[embarcacoesRoutes] Retrieving all pending boats");
    let result = await embarcacoesModel.getPendingEmbarcacoes();
    res.status(result.status).send(result.data);

});

router.get('/verified', async function(req, res, next) {
    console.log("[embarcacoesRoutes] Retrieving all verified boats");
    let result = await embarcacoesModel.getVerifiedEmbarcacoes();
    res.status(result.status).send(result.data);

});

router.put('/update/verification/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[embarcacoesRoutes] Verifying boat with id " + JSON.stringify(id));
    let result = await embarcacoesModel.verifyEmbarcacao(id);
    res.status(result.status).send(result.data);

});

router.get('/prop/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[embarcacoesRoutes] Show all boats of proprietario with id: "+ id);
    let result = await embarcacoesModel.getAllEmbarcacoesFromUser(id);
    res.status(result.status).send(result.data);

});



module.exports = router;
