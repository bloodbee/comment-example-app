const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const helmet = require("helmet");

const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();

require('dotenv').config({path: '.env'});

mongoose
.connect(
  `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
  {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log(`MongoDB connected on mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`))
  .catch(err => console.log(err));
  
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*')
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods")
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS, PUT")
  next()
})

app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

module.exports = app;
