// load .env data into
require('dotenv').config();

// Web server
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
//this is to handel data from HTML forms
app.use(express.urlencoded({ extended: true }));
//this is to handel data in json formats
app.use(express.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
const debug = require('./routes/debug');
const user = require('./routes/user.js');
const getters = require('./routes/getters.js');
const inserts = require('./routes/inserts');
const deletions = require('./routes/deletions');


// Mount all resource routes
app.use('/debug', debug);
app.use('/user', user);
app.use('/getters', getters);
app.use('/inserts', inserts);
app.use('/delete', deletions);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.status(200).send({ message: 'api', date: new Date } );
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

