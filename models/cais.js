const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getCais = (request, response) => {
    client.query('select * from cais', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const get1Cais = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('select * from cais WHERE cais_id = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCais,get1Cais,
}