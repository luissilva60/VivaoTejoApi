const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();

module.exports.getArtigos = async function() {
    try {
        let sql = `select artigos.*, utilizador_name,to_char(artigos_date, \'DD-MM-YYYY\') data from artigos
            inner join utilizador u on u.utilizador_id = artigos.artigos_ut_id
            order by artigos_id`;
        let result = await client.query(sql);
        let artigos = result.rows;
        console.log("[artigosModel.getArtigos] artigos = " + JSON.stringify(artigos));
        return{status: 200, data: artigos}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.getNumberArtigos = async function() {
    try {
        let sql = `select count(*) from artigos
            inner join utilizador u on u.utilizador_id = artigos.artigos_ut_id`;
        let result = await client.query(sql);
        let artigos = result.rows;
        console.log("[artigosModel.getArtigos] artigos count  = " + JSON.stringify(artigos));
        return{status: 200, data: artigos}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.getArtigo = async function(id) {
    console.log("[artigosModel.getArtigo] id = " + JSON.stringify(id));
    try {
        let sql = `select artigos.*, utilizador_name, to_char(artigos_date, \'DD-MM-YYYY\') from artigos
            inner join utilizador u on u.utilizador_id = artigos.artigos_ut_id
                   WHERE artigos_id = $1`;
        let result = await client.query(sql, [id]);
        let artigo = result.rows;
        if (artigo.length > 0) {
            console.log("[artigosModel.getArtigo] artigo = " + JSON.stringify(artigo[0]));
            return { status: 200, data: artigo[0] };
        } else {
            return { status: 404, data: { msg: "Embarcacao not found." } };
        }

    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.addArtigo = async function(artigo) {
    if (typeof artigo != "object" ) {
        if (artigo.errMsg)
            return { status: 400, data: { msg: artigo.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = `insert into artigos(artigos_title, artigos_subtitle, artigos_info,artigos_date, artigos_ut_id) 
    values('${artigo.title}', '${artigo.subtitle}', '${artigo.info}', '${artigo.date}',${artigo.utId})`
        let result = await client.query(sql);
        let artigos = result.rows[0];
        console.log("[[artigosModel.addArtigo] artigo = " + JSON.stringify(artigos));
        return {status: 200, data: "Successfully added a boat"};
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.deleteArtigo = async function(id) {
    console.log("[artigosModel.deleteArtigo] id = " + JSON.stringify(id));
    try {
        let sql = `delete from artigos where artigos_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.updateArtigo = async function(artigo) {
    if (typeof artigo != "object" ) {
        if (artigo.errMsg)
            return { status: 400, data: { msg: artigo.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    } try {
        let updateQuery = `update artigos
                       set artigos_title = '${artigo.title}',
                        artigos_subtitle= '${artigo.subtitle}',
                        artigos_info = '${artigo.info}',
                        artigos_date = '${artigo.date}',
                        artigos_ut_id = '${artigo.utId}'
                       where artigos_id = ${artigo.id}`
        let result = await client.query(updateQuery);


        console.log("[artigosModel.updateArtigo] artigo = " + JSON.stringify(artigo));
        return {status: 200, data: "Updated succesfully"};
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
