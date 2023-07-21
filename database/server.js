// load .env data into
require('dotenv').config();

// Web server
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Separated Routes for each Resource
const test = require('./routes/test.js');


// Mount all resource routes
app.use('/test', test);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
