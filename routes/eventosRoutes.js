var express = require('express');
var router = express.Router();
var eventosModel = require('../models/eventos')

router.get('', async function(req, res, next) {
    console.log("[eventosRoutes] Retrieving all events");
    let result = await eventosModel.getEventos();
    res.status(result.status).send(result.data);

});
router.get('/upcoming', async function(req, res, next) {
    console.log("[eventosRoutes] Retrieving all upcoming events in order");
    let result = await eventosModel.getOrderedUpcomingEventos();
    res.status(result.status).send(result.data);

});
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[eventosRoutes] event with id: "+ id);
    let result = await eventosModel.getEvento(id);
    res.status(result.status).send(result.data);

});

router.post('/new', async function(req, res, next) {
    let evento = req.body;
    console.log("[eventosRoutes] Saving event " + JSON.stringify(evento));
    let result = await eventosModel.addEvento(evento);
    res.status(result.status).send(result.data);

});

router.delete('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[eventosRoutes] Deleting event with id: "+ id);
    let result = await eventosModel.deleteEvento(id);
    res.status(result.status).send(result.data);

});

router.put('/update', async function(req, res, next) {
    let evento = req.body;
    console.log("[eventosRoutes] Updating event " + JSON.stringify(evento));
    let result = await eventosModel.updateEvento(evento);
    res.status(result.status).send(result.data);

});

module.exports = router;
