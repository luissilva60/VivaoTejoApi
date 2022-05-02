const client = require('./connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();
module.exports.getUsers = async function() {
    try {
        let sql = 'select * from utilizador';
        let result = await client.query(sql);
        let users = result.rows;
        console.log("[userModel.getUsers] Users = " + JSON.stringify(users));
        return{status: 200, data: users}
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.getUser = async function(id) {
    console.log("[userModel.getUser] id = " + JSON.stringify(id));
    try {
        let sql = 'select * from utilizador WHERE utilizador_id = $1';
        let result = await client.query(sql, [id]);
        let user = result.rows;
        if (user.length > 0) {
            console.log("[userModel.getUser] user = " + JSON.stringify(user[0]));
            return { status: 200, data: user[0] };
        } else {
            return { status: 404, data: { msg: "User not found." } };
        }

    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.addUser = async function(user) {
    if (typeof user != "object" ) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = `insert into utilizador(utilizador_name, utilizador_bdate, utilizador_gender,utilizador_email, utilizador_password, utilizador_role_id) 
    values('${user.name}', '${user.bdate}', '${user.gender}', '${user.email}', '${user.password}',${user.roleId})`
        let result = await client.query(sql);
        let users = result.rows[0];
        console.log("[userModel.addUser] user = " + JSON.stringify(users));
        return {status: 200, data: "Successfully added a user"};
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.deleteUser = async function(id) {
    console.log("[userModel.deleteUser] id = " + JSON.stringify(id));
    try {
        let sql = `delete from utilizador where utilizador_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.updateUser = async function(user) {
    if (typeof user != "object" ) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    } try {
        let updateQuery = `update utilizador
                       set utilizador_name = '${user.name}',
                       utilizador_email= '${user.email}',
                       utilizador_password = '${user.password}'
                       where utilizador_id = ${user.id}`
        let result = await client.query(updateQuery);


        console.log("[userModel.updateUser] user = " + JSON.stringify(user));
        return {status: 200, data: "Updated succesfully"};
    }catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



