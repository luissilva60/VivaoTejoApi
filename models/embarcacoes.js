const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


/*module.exports.getEmbarcacoes = (request, response) => {
    client.query('select * from embarcacao', (error, results) => {
        if (error) {
            throw error
        }
        var results = {status : 200, data: results.rows}
        response.send(results);
    })
}*/

module.exports.getEmbarcacoes = async function() {
    try {
        let sql = 'select * from embarcacao';
        let result = await client.query(sql);
        let embarcacoes = result.rows;
        console.log("[productsModel.getEmbarcacoes] embarcacoes = " + JSON.stringify(embarcacoes));
        return{status: 200, data: embarcacoes}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.getEmbarcacao = async function(id) {

    try {
        let sql = 'select * from embarcacao WHERE embarcacao_id = $1';
        let result = await client.query(sql, [id]);
        let embarcacoes = result.rows;
        if (embarcacoes.length > 0) {
            console.log("[productsModel.getProduct] product = " + JSON.stringify(embarcacoes[0]));
            return { status: 200, data: embarcacoes[0] };
        } else {
            return { status: 404, data: { msg: "Product not found." } };
        }

    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.addEmbarcacao = (req, res) => {
    const embarcacao = req.body;
    let insertQuery = `insert into embarcacao(embarcacao_name, embarcacao_info, embarcacao_prop_id,embarcacao_cais_id) 
    values('${embarcacao.embarcacao_name}', '${embarcacao.info}', '${embarcacao.propId}', '${embarcacao.caisId}')`

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
                       embarcacao_info= '${emb.info}',
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
