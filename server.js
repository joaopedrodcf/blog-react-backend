// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');

const cors = require('cors');
require('dotenv').config();

// Set up Mongoose
mongoose.connect(db.db_dev);
mongoose.Promise = global.Promise;

const app = express();

// Need in production because
// https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: process.env.ENDPOINT,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, {});

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
