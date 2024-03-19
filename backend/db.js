const Pool = require("pg").Pool;
//ge
const pool = new Pool({
    user: "postgres",
    password: "masoud",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;



