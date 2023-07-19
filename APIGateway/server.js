const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const adminMiddleware = require('./middlewares/adminMiddleware.js');

app.use('/api/auth', proxy('http://authentication-service:8081'));
app.use('/api/product', adminMiddleware, proxy('http://products-service:8082'));

app.listen(3000, () => {
	console.log('listening on port 3000');
});
