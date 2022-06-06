const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();
module.exports.getEventos = async function() {
    try {
        let sql = `select eventos.*, state_event, to_char(eventos_date, \'DD-MM-YYYY\') data, st_x(eventos_local)lat , st_y(eventos_local) long from eventos 
            inner join state s on s.state_id = eventos.eventos_state_id
                   order by eventos_id`;
        let result = await client.query(sql);
        let eventos = result.rows;
        console.log("[eventosModel.getEventos] eventos = " + JSON.stringify(eventos));
        return{status: 200, data: eventos}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}



module.exports.getOrderedUpcomingEventos = async function() {
    try {
        let sql = 'select *, to_char(eventos_date, \'DD-MM-YYYY\') data, st_x(eventos_local)lat , st_y(eventos_local) long from eventos WHERE eventos_date > now() ORDER BY eventos_date ASC';
        let result = await client.query(sql);
        let eventos = result.rows;
        console.log("[eventosModel.getOrderedUpcomingEventos] eventos = " + JSON.stringify(eventos));
        return{status: 200, data: eventos}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.getStateEventCount = async function() {
    try {
        let sql = `select state_event, count(*) from eventos
            inner join state s on s.state_id = eventos.eventos_state_id
            group by state_event`;
        let result = await client.query(sql);
        let eventos = result.rows;
        console.log("[eventosModel.getStateEventCount] eventos = " + JSON.stringify(eventos));
        return{status: 200, data: eventos}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.getEvento = async function(id) {
    console.log("eventosModel.getEvento] id = " + JSON.stringify(id));
    try {
        let sql = 'select *, to_char(eventos_date, \'DD-MM-YYYY\') data, st_x(eventos_local)lat , st_y(eventos_local) long from eventos WHERE eventos_id = $1';
        let result = await client.query(sql, [id]);
        let evento = result.rows;
        if (evento.length > 0) {
            console.log("[eventosModel.getEvento] Evento = " + JSON.stringify(evento[0]));
            return { status: 200, data: evento[0] };
        } else {
            return { status: 404, data: { msg: "Evento not found." } };
        }

    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.addEvento = async function(evento) {
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
        let newev = result.rows[0];
        console.log("[eventosModel.addEvento] Evento= " + JSON.stringify(newev));
        return {status: 200, data: "Successfully added an event"};
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.deleteEvento = async function(id) {
    console.log("[eventosModel.deleteEvento] id = " + JSON.stringify(id));
    try {
        let sql = `delete from eventos where eventos_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.updateEvento = async function(evento) {
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


        console.log("[eventosModel.addEvento] Evento = " + JSON.stringify(evento));
        return {status: 200, data: "Updated succesfully"};
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



