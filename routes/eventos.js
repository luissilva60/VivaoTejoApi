const client = require('../models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getEventos = (request, response) => {
    client.query('select * from eventos', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEvento = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('select * from eventos WHERE eventos_id = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

module.exports = {
    getEventos,getEvento,
}