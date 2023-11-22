// require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or 3000 if not set
const router = require('./routes/index');
const connectDB = require('./database/db');
const mongoose = require('mongoose');

// const Pool = require('./database/db')

app.use(bodyParser.json());
app.use('/api/v1', router)

// Define a (health-check) basic route
app.get('/', (req, res) => {
    res.send('Hello, World!\nThe system is up and working');
});

// Start the server

const start = async () => {
    try {
        await connectDB();

        app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`); });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();