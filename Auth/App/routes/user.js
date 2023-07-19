const express = require('express');
const router = express();
const authMiddleware = require('../middleware/auth.js');
const userCtrl = require('../controllers/user.js');

router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get(
	'/getUserInfoFromToken',
	authMiddleware.verifyToken,
	userCtrl.getUserInfoFromToken
);

module.exports = router;