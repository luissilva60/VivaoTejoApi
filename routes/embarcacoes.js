const client = require('../models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getEmbarcacoes = (request, response) => {
    client.query('select * from embarcacao', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEmbarcacao = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('select * from embarcacao WHERE embarcacao_id = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addEmbarcacao = (req, res) => {
    const embarcacao = req.body;
    let insertQuery = `insert into embarcacao(embarcacao_name, embarcacao_info, embarcacao_prop_id,embarcacao_cais_id) 
    values('${embarcacao.embarcacao_name}', '${embarcacao.embarcacao_info}', '${embarcacao.embarcacao_prop_id}', '${embarcacao.embarcacao_cais_id}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was sucessful')
            console.log('Insertion was sucessful');
        }
        else{console.log(err.message)}
    })
    client.end;
}


module.exports = {
    getEmbarcacoes, getEmbarcacao, addEmbarcacao
}