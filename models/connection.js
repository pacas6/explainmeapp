var pg = require('pg');

// dados da base de dados password, nome.
const connectionString = "postgres://postgres:cassenda@localhost:5432/ExplainMe"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10,

    /*
    ssl: {
        require: true, 
        rejectUnauthorized: false
    }
    */
})

module.exports = pool;