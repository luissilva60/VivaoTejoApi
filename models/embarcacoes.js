const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();



module.exports.getEmbarcacoes = async function() {
    try {
        let sql = `SELECT embarcacao.*, st_X(embarcacao_pos) lat, st_Y(embarcacao_pos)long, utilizador_name
                   FROM embarcacao
                            INNER JOIN utilizador
                                       ON embarcacao.embarcacao_prop_id = utilizador.utilizador_id`;
        let result = await client.query(sql);
        let embarcacoes = result.rows;
        console.log("[embarcacaoModel.getEmbarcacoes] embarcacoes = " + JSON.stringify(embarcacoes));
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
            console.log("[embarcacaoModel.getEmbarcacao] embarcacao = " + JSON.stringify(embarcacoes[0]));
            return { status: 200, data: embarcacoes[0] };
        } else {
            return { status: 404, data: { msg: "Embarcacao not found." } };
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
        let sql = `insert into embarcacao(embarcacao_name, embarcacao_info, embarcacao_prop_id, embarcacao_pos) 
    values('${embarcacao.name}', '${embarcacao.info}', '${embarcacao.propId}', ${embarcacao.pos})`
        let result = await client.query(sql);
        let embarcacoes = result.rows[0];
        console.log("[embarcacaoModel.addEmbarcacao] embarcacao = " + JSON.stringify(embarcacoes));
        return {status: 200, data: "Successfully added a boat"};
    } catch (err) {
        console.log(err);
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

module.exports.updateEmbarcacao = async function(embarcacao) {
    if (typeof embarcacao != "object" ) {
        if (embarcacao.errMsg)
            return { status: 400, data: { msg: embarcacao.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    } try {
        let updateQuery = `update embarcacao
                       set embarcacao_name = '${embarcacao.name}',
                       embarcacao_info= '${embarcacao.info}',
                       embarcacao_prop_id = '${embarcacao.propId}',
                       embarcacao_pos = ${embarcacao.pos}
                       where embarcacao_id = ${embarcacao.id}`
        let result = await client.query(updateQuery);


        console.log("[embarcacaoModel.updateEmbarcacao] embarcacao = " + JSON.stringify(embarcacao));
        return {status: 200, data: "Updated succesfully"};
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getEmbarcacoesinPolygon = async function() {
    try {
        let sql = `Select cais.cais_id, cais.cais_name, embarcacao.embarcacao_id, embarcacao.embarcacao_name, count(cais_id), ST_Intersects( cais_spot , embarcacao_pos)Intersections 
                from cais, embarcacao where Intersections = true`;
        let result = await client.query(sql);
        let embarcacoes = result.rows;
        console.log("[embarcacaoModel.getEmbarcacoes] embarcacoes = " + JSON.stringify(embarcacoes));
        return{status: 200, data: embarcacoes}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.getNumberOfEmbarcacoesInPolygon = async function(id) {
    try {
        let sql = `Select cais_id, count(*) from cais, embarcacao
                   where ST_Intersects( cais_spot , embarcacao_pos) = true group by cais_id AND cais_id = ${id}`;
        let result = await client.query(sql, id);
        let embarcacoes = result.rows;
        console.log("[embarcacaoModel.getEmbarcacoes] embarcacoes = " + JSON.stringify(embarcacoes));
        return{status: 200, data: embarcacoes}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

