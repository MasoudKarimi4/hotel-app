const Pool = require("pg").Pool;


const pool = new Pool({
    user: "postgres",
    password: "mojang03", //TYPE YOUR PGADMIN PASSWORD HERE 
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;



