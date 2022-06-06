var express = require('express');
var router = express.Router();
var fotosModel = require('../models/fotos')

router.get('', async function(req, res, next) {
    console.log("[fotosRoutes] Retrieving all photos");
    let result = await fotosModel.getFotos();
    res.status(result.status).send(result.data);

});
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[fotosRoutes] event with id: "+ id);
    let result = await fotosModel.getFoto(id);
    res.status(result.status).send(result.data);

});

router.post('/new', async function(req, res, next) {
    let foto = req.body;
    console.log("[fotosRoutes] Saving photo " + JSON.stringify(foto));
    let result = await fotosModel.addFoto(foto);
    res.status(result.status).send(result.data);

});

router.delete('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[fotosRoutes] Deleting photo with id: "+ id);
    let result = await fotosModel.deleteFoto(id);
    res.status(result.status).send(result.data);

});

router.put('/update', async function(req, res, next) {
    let foto = req.body;
    console.log("[fotosRoutes] Updating photo " + JSON.stringify(foto));
    let result = await fotosModel.updateFoto(foto);
    res.status(result.status).send(result.data);

});

module.exports = router;