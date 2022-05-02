const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();

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
    console.log("[embarcacaoModel.getEmbarcacao] id = " + JSON.stringify(id));
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

module.exports.addEmbarcacao = async function(embarcacao) {
    if (typeof embarcacao != "object" ) {
        if (embarcacao.errMsg)
            return { status: 400, data: { msg: embarcacao.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = `insert into embarcacao(embarcacao_name, embarcacao_info, embarcacao_prop_id,embarcacao_cais_id) 
    values('${embarcacao.name}', '${embarcacao.info}', '${embarcacao.propId}', '${embarcacao.caisId}')`
        let result = await client.query(sql);
        let embarcacoes = result.rows[0];
        console.log("[embarcacaoModel.addEmbarcacao] embarcacao = " + JSON.stringify(embarcacoes));
        return {status: 200, data: embarcacoes};
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }

}

module.exports.deleteEmbarcacao = async function(id) {
    console.log("[embarcacaoModel.deleteEmbarcacao] id = " + JSON.stringify(id));
    try {
        let sql = `delete from embarcacao where embarcacao_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

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
