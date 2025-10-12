require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,

});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
    process.exit(-1);
});

module.exports = pool;