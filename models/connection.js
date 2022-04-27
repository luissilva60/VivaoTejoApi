var pg = require('pg');

const connectionString = "postgres://hcildblhtqijrk:1eec3da7828c8eccf677fccb7ffe2aeba8e7c5e746552ff652d070dd3cbe5696@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/ddorsqoq6lpcnm\n"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
})

module.exports = pool;