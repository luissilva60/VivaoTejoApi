const client = require('../models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getUsers = (request, response) => {
    client.query('select * from utilizador', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
}