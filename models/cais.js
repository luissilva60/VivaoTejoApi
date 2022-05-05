const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();

module.exports.getCais = async function() {
    try {
        let sql = 'select *, St_asText(cais_spot) Pontos from cais';
        let result = await client.query(sql);
        let cais = result.rows;
        console.log("[caisModel.getCais] cais = " + JSON.stringify(cais));
        return{status: 200, data: cais}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.get1Cais = async function(id) {
    console.log("[caisModel.get1Cais] id = " + JSON.stringify(id));
    try {
        let sql = 'select * from cais WHERE cais_id = $1';
        let result = await client.query(sql, [id]);
        let cais = result.rows;
        if (cais.length > 0) {
            console.log("[caisModel.get1Cais] cais = " + JSON.stringify(cais[0]));
            return { status: 200, data: cais[0] };
        } else {
            return { status: 404, data: { msg: "Cais not found." } };
        }

    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.addCais = async function(cais) {
    if (typeof cais != "object" ) {
        if (cais.errMsg)
            return { status: 400, data: { msg: cais.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = `insert into cais(cais_name, cais_spot, cais_info) 
    values('${cais.name}', '${cais.spot}', '${cais.info}')`
        let result = await client.query(sql);
        let caisNew = result.rows[0];
        console.log("[caisModel.addCais] cais = " + JSON.stringify(caisNew));
        return {status: 200, data: "Successfully added a cais"};
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.deleteCais = async function(id) {
    console.log("[caisModel.deleteCais] id = " + JSON.stringify(id));
    try {
        let sql = `delete from cais where cais_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.updateCais = async function(cais) {
    if (typeof cais != "object" ) {
        if (cais.errMsg)
            return { status: 400, data: { msg: cais.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    } try {
        let updateQuery = `update cais
                       set cais_name = '${cais.name}',
                       cais_spot = '${cais.spot}',
                       cais_info  = '${cais.info}'
                       where cais_id = ${cais.id}`
        let result = await client.query(updateQuery);


        console.log("[caisModel.addCais] cais = " + JSON.stringify(cais));
        return {status: 200, data: "Updated succesfully"};
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
