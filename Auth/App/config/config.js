require('dotenv').config();
const process = require('process');
module.exports = {
	development: {
		database_url: process.env.DB_URL,
	},
};
