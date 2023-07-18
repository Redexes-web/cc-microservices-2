const jwt = require('jsonwebtoken');
const process = require('process');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		//decoded the token
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decodedToken);
		const userId = decodedToken.userId;
		//save userId in req.auth var
		if (!mongoose.isValidObjectId(userId)) {
			return res.status(400).json({ error: 'ID de compte invalide' });
		  }
		req.auth = {
			userId,
		};
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({
			error: 'Vous devez être connecté pour accéder à cette ressource',
		});
	}
};
