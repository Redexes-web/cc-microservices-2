const jwt = require('jsonwebtoken');
const process = require('process');
const auth = {
	verifyToken: (req, res, next) => {
		let token = req.header('Authorization');
		console.log(token);
		if (!token) {
			return res.status(401).json({ error: 'Access denied' });
		}
		//remove "Bearer " from token
		token = token.split(' ')[1];

		try {
			const decoded = jwt.verify(token, process.env.TOKEN_SECRET, { ignoreExpiration: true })
            console.log(decoded)
			req.user = decoded;
			next();
		} catch (error) {
			console.error(error);
			res.status(400).json({ error: 'Invalid token' });
		}
	},
};
module.exports = auth;
