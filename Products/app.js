const express = require('express');
const router = require('./App/routes/index');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const helmet = require('helmet');
const db = require('./App/models/db');
const logFilePath = './logs.log';

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

app.use(helmet());
app.use(morgan('combined', { stream: logStream }));
app.use(express.json());
//Ajout des routes
app.use('/', router);
module.exports = app;
