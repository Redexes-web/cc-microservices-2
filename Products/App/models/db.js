'use strict';

const path = require('path');
const mongoose = require('mongoose');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const mongoUri = config.database_url;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbConnection = mongoose.connection;
dbConnection.on(
	'error',
	console.error.bind(
		console,
		'Erreur lors de la connexion à la base de données :'
	)
);
dbConnection.once('open', function () {
	console.log('Connexion réussie à la base de données.');
});
db.mongoose = mongoose;

module.exports = db;
