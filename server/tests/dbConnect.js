require('dotenv').config({ path: '../.env' });
const pool = require('../config/db');


const dbConnect = async () => {
    try {
        const result = await pool.query('SELECT * FROM upcoming_races;');
        console.log('Connection successful');
        console.log(result.rows[0])
        process.exit(0);
    } catch (error) {
        console.error('Connection failed', error.message);
        process.exit(1);
    }
};

dbConnect();