const express = require('express');
const router = require('./App/routes/index');
const app = express();
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const fs = require('fs');
const helmet = require('helmet');
const db = require('./App/models/db');
const swaggerDocument = require('./swagger.json');
const logFilePath = './logs.log';

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

app.use(helmet());
app.use(morgan('combined', { stream: logStream }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Ajout des routes
app.use('/', router);
module.exports = app;
