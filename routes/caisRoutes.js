var express = require('express');
var router = express.Router();
var caisModel = require('../models/cais')

router.get('', async function(req, res, next) {
    console.log("[caisRoutes] Retrieving all cais");
    let result = await caisModel.getCais();
    res.status(result.status).send(result.data);

});
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[caisRoutes] cais with id: "+ id);
    let result = await caisModel.get1Cais(id);
    res.status(result.status).send(result.data);

});

router.post('/new', async function(req, res, next) {
    let cais = req.body;
    console.log("[caisRoutes] Saving cais:  " + JSON.stringify(cais));
    let result = await caisModel.addCais(cais);
    res.status(result.status).send(result.data);

});

router.delete('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[caisRoutes] Deleting cais with id: "+ id);
    let result = await caisModel.deleteCais(id);
    res.status(result.status).send(result.data);

});

router.put('/update', async function(req, res, next) {
    let cais = req.body;
    console.log("[caisRoutes] Updating cais:  " + JSON.stringify(cais));
    let result = await caisModel.updateCais(cais);
    res.status(result.status).send(result.data);

});

module.exports = router;
