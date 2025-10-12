const express = require('express');
require('dotenv').config();

const cors = require('cors');
const pool = require('./config/db');

const racesRoutes = require('./routes/racesRoutes')

const app = express();


//Middleware
app.use(cors());
app.use(express.json())

//Routes
app.use('/api/race', racesRoutes)

//Health check

//404 Handler

//Global Error Handler


const SERVER_PORT = process.env.SERVER_PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(SERVER_PORT, () => {
        console.log(`Server is running on Port: ${SERVER_PORT}`);
    });
}

module.exports = app;












