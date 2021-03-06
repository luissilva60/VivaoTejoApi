var express = require('express');
var router = express.Router();
var userModel = require('../models/utilizadores')

router.get('', async function(req, res, next) {
    console.log("[UtilizadoresRoutes] Retrieving all users");
    let result = await userModel.getUsers();
    res.status(result.status).send(result.data);

});

router.get('/count', async function(req, res, next) {
    console.log("[UtilizadoresRoutes] Retrieving user count by role");
    let result = await userModel.getUserCount();
    res.status(result.status).send(result.data);

});
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[UtilizadoresRoutes] user with id: "+ id);
    let result = await userModel.getUser(id);
    res.status(result.status).send(result.data);

});

router.post('/new', async function(req, res, next) {
    let user = req.body;
    console.log("[UtilizadoresRoutes] Saving user " + JSON.stringify(user));
    let result = await userModel.addUser(user);
    res.status(result.status).send(result.data);

});

router.delete('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id
    console.log("[UtilizadoresRoutes] Deleting boat with id: "+ id);
    let result = await userModel.deleteUser(id);
    res.status(result.status).send(result.data);

});

router.put('/update', async function(req, res, next) {
    let user = req.body;
    console.log("[UtilizadoresRoutes] Updating boat " + JSON.stringify(user));
    let result = await userModel.updateUser(user);
    res.status(result.status).send(result.data);

});

router.get('/login/:email/:password', async function(req, res, next) {
    let email = req.params.email
    let password = req.params.password
    console.log("[UtilizadoresRoutes] Login: Email: "+ JSON.stringify(email) + "Password: " + JSON.stringify(password));
    let result = await userModel.getUserLogin(email, password);
    res.status(result.status).send(result.data);

});

router.post('/login', async function(req, res, next) {
    let user = req.body;
    console.log("[UtilizadoresRoutes] Login: " + JSON.stringify(user));
    let result = await userModel.getLogin(user);
    res.status(result.status).send(result.data);

});

router.get('/proprietarios', async function(req, res, next) {
    console.log("[UtilizadoresRoutes] Retrieving all proprietarios");
    let result = await userModel.getUsersProp();
    res.status(result.status).send(result.data);

});

router.get('/no/proprietarios', async function(req, res, next) {
    console.log("[UtilizadoresRoutes] Retrieving all users except proprietarios");
    let result = await userModel.getUsersExceptProp();
    res.status(result.status).send(result.data);

});

module.exports = router;
