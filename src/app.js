const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const financialProcessing = require('./routers/financialProcessing');

const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', financialProcessing);

app.use((err, req, res, next) => {
  res.status(500).send('OPS!!! Algo deu errado!'); 
});

app.use((req, res, next) => {
  next(createError(404, 'Solicitação não encontrada'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message
  });
});

module.exports = app;
