var express = require('express');
var router = express.Router();
var artigosModel = require('../models/artigos')

router.get('', async function(req, res, next) {
    console.log("[artigosRoutes] Retrieving all artigos");
    let result = await artigosModel.getArtigos();
    res.status(result.status).send(result.data);

});
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[artigosRoutes] artigo with id: "+ id);
    let result = await artigosModel.getArtigo(id);
    res.status(result.status).send(result.data);

});

router.post('/new', async function(req, res, next) {
    let artigo = req.body;
    console.log("[artigosRoutes] Saving artigo " + JSON.stringify(artigo));
    let result = await artigosModel.addArtigo(artigo);
    res.status(result.status).send(result.data);

});

router.delete('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[artigosRoutes] Deleting artigo with id: "+ id);
    let result = await artigosModel.deleteArtigo(id);
    res.status(result.status).send(result.data);

});

router.put('/update', async function(req, res, next) {
    let embarcacao = req.body;
    console.log("[artigosRoutes] Updating artigo " + JSON.stringify(embarcacao));
    let result = await artigosModel.updateArtigo(embarcacao);
    res.status(result.status).send(result.data);

});

module.exports = router;
