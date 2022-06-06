const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();
module.exports.getFotos = async function() {
    try {
        let sql = `select * from fotos order by fotos_id`;
        let result = await client.query(sql);
        let fotos = result.rows;
        console.log("[fotosModel.getFotos] fotos = " + JSON.stringify(fotos));
        return{status: 200, data: fotos}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}



module.exports.getFoto = async function(id) {
    console.log("fotosModel.getFoto] id = " + JSON.stringify(id));
    try {
        let sql = 'select * from fotos WHERE fotos_id = $1';
        let result = await client.query(sql, [id]);
        let foto = result.rows;
        if (foto.length > 0) {
            console.log("[eventosModel.getFoto] foto = " + JSON.stringify(foto[0]));
            return { status: 200, data: foto[0] };
        } else {
            return { status: 404, data: { msg: "foto not found." } };
        }

    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.addFoto = async function(evento) {
    if (typeof evento != "object" ) {
        if (evento.errMsg)
            return { status: 400, data: { msg: evento.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = `insert into eventos (eventos_name, eventos_info, eventos_date, eventos_local, eventos_starttime, eventos_endtime, eventos_state_id) 
    values('${evento.name}', '${evento.info}', '${evento.date}', '${evento.local}', '${evento.startTime}','${evento.endTime}', ${evento.stateId} )`
        let result = await client.query(sql);
        let newfoto = result.rows[0];
        console.log("[fotosModel.addFoto] fotos = " + JSON.stringify(newfoto));
        return {status: 200, data: "Successfully added an event"};
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.deleteFoto = async function(id) {
    console.log("[fotosModel.deleteFoto] id = " + JSON.stringify(id));
    try {
        let sql = `delete from eventos where eventos_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.updateFoto = async function(evento) {
    if (typeof evento != "object" ) {
        if (evento.errMsg)
            return { status: 400, data: { msg: evento.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    } try {
        let updateQuery = `update eventos
                       set eventos_name = '${evento.name}',
                       eventos_info= '${evento.info}',
                       eventos_date = '${evento.date}',
                       eventos_local = ${evento.local},
                       eventos_starttime = '${evento.starttime}',
                       eventos_endtime = '${evento.endtime}',
                       eventos_state_id = '${evento.stateId}'
                       where eventos_id = ${evento.id}`
        let result = await client.query(updateQuery);


        console.log("[fotosModel.updateFoto] Evento = " + JSON.stringify(evento));
        return {status: 200, data: "Updated succesfully"};
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}