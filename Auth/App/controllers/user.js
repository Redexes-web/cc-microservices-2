const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const process = require('process');

exports.signup = async (req, res) => {
	try {
		const user = new User({
			...req.body,
		});

		const savedUser = await user.save();
		res.status(201).json({
			...savedUser._doc,
			password: undefined,
			__v: undefined,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Erreur de validation: ' + error.message);
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Find user in database using decrypted email
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(401).json({ error: 'User Not found' });
		}

		// Compare passwords
		const passwordVerify = await bcrypt.compare(password, user.password);

		if (!passwordVerify) {
			return res.status(401).json({ error: 'User Not found' });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
			expiresIn: '24h',
		});
		res.json({
			user: {
				...user._doc,
				password: undefined,
				__v: undefined,
			},
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error Authenticating User');
	}
};
