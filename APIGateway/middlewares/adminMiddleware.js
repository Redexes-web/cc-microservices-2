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
module.exports = adminMiddleware;