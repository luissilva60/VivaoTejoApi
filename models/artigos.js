const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getArtigos = (request, response) => {
    client.query('select * from artigos', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getArtigo = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('select * from artigos WHERE artigos_id = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getArtigos,getArtigo,
}