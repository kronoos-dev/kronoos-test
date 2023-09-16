const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
//Rotas
const index = require('./routes/index');
const processRoute = require('./routes/processRoute');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', index);
app.use('/process', processRoute);
module.exports = app;