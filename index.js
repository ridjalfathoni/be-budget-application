const express = require('express');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.status(200).send({
        message: "test"
    })
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
});