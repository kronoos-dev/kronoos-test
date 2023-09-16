const express = require('express');
const app = express();
const router = express.Router();
//Rotas
const index = require('./routes/index');
const processRoute = require('./routes/processRoute');
app.use('/', index);
app.use('/process', processRoute);
module.exports = app;