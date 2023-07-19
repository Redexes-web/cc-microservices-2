const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const axios = require('axios');

const adminMiddleware = async (req, res, next) => {
	try {
		const response = await axios.get(
			'http://authentication-service:8081/getUserInfoFromToken',
			{
				headers: {
					Authorization: req.header('Authorization'),
				},
			}
		);
		const userRole = response.data.role;
		if (!userRole.includes('admin')) {
			return res.status(403).json({ error: 'Access denied' });
		}
		next();
	} catch (error) {
		res
			.status(500)
			.json({ error: error.response.data.error ?? 'Internal server error' });
	}
};
app.use('/api/auth', proxy('http://authentication-service:8081'));
app.use('/api/product', adminMiddleware, proxy('http://products-service:8082'));

app.listen(3000, () => {
	console.log('listening on port 3000');
});
