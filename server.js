// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');
const session = require('express-session');

// Set up Mongoose
mongoose.connect(db.db_dev);
mongoose.Promise = global.Promise;

const app = express();

const port = 8000;

// use sessions for tracking logins
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  })
);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, {});

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
