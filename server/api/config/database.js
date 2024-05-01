const { Pool } = require('pg');
const dotenv = require('dotenv');
 
dotenv.config({path: './api/config/.env'});

const pool = new Pool({
    connectionString: process.env.DB_URL
});

module.exports = {
    query: (text, params) => pool.query(text, params)
        .then((resut) => resut)
        .catch(error => {
            console.error(`Error in query: ${error}`)
        })
}