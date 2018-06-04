// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');

// Set up Mongoose
mongoose.connect(db.db_dev);
mongoose.Promise = global.Promise;

const app = express();

const port = 8000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, {});

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
