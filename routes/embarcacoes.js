const client = require('../models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


module.exports.getEmbarcacoes = (request, response) => {
    client.query('select * from embarcacao', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getEmbarcacao = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('select * from embarcacao WHERE embarcacao_id = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports.addEmbarcacao = (req, res) => {
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

module.exports.deleteEmbarcacao = (req, res)=> {
    let insertQuery = `delete from embarcacao where embarcacao_id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
}

module.exports.updateEmbarcacao = (req, res)=> {
    let emb = req.body;
    let updateQuery = `update embarcacao
                       set embarcacao_name = '${emb.name}',
                       embarcacao_ info= '${emb.info}',
                       embarcacao_prop_id = '${emb.propId}',
                       embarcacao_cais_id = '${emb.caisId}'
                       where embarcacao_id = ${emb.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
}
