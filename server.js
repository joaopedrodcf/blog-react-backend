// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

// Set up Mongoose
mongoose.connect(db.db_dev);
mongoose.Promise = global.Promise;
const { connection } = mongoose;

const app = express();

const port = 8000;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// use sessions for tracking logins
// saving the sessions on mongo
app.use(
  session({
    secret: 'work hard',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: connection })
  })
);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, {});

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
