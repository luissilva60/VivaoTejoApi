const client = require('../models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getEmbarcacoes = (request, response) => {
    client.query('select * from embarcacoes', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEmbarcacao = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('select * from utilizador WHERE utilizador_id = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getEmbarcacoes, getEmbarcacao
}