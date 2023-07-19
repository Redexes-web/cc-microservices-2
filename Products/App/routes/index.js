const express = require('express');
const router = express();
const productRoutes = require('./product.js');
router.use('/', productRoutes);

module.exports = router;
