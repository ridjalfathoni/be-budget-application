const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('./utils/db');

let router = require('express').Router();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ROUTES
require('./routes/index')(app,router)

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/api/`)
});