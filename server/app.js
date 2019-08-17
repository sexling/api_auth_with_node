const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const config = require('config');

const db = (process.env.NODE_ENV = 'prod'
  ? config.get('db.prod')
  : config.get('db.test'));

mongoose.connect(
  db,
  { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
  err => {
    if (err) {
      console.error(err);
    } else {
      console.log('MongoDB connected');
    }
  }
);

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', require('./routes/users'));

module.exports = app;
