var pg = require('pg');

const connectionString = "postgres://dktziebnwjhjsh:909bb922b6fa4c3a5e67b1c582e279832e0ab44caab4cdbcba5df7ede5b4078e@ec2-54-228-218-84.eu-west-1.compute.amazonaws.com:5432/dev34eb5gh9jll\n"
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