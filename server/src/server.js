const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const db = require('./app/config/db');
const route = require('./app/routes');
// app.use(cors());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);
db.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ////////////////////////////////

// const startBrowser = require('../src/scape_data/browser');
// const scrapeController = require('../src/scape_data/scrapeController');
// const browser = startBrowser();
// scrapeController(browser);

// ///////////////////////////////
route(app);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Example app listening on port `);
});
