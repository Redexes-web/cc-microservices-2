const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product');

router.post('/', productCtrl.create);
router.get('/', productCtrl.get);
router.get('/:id', productCtrl.getById);
router.put('/:id', productCtrl.update);
router.delete('/:id', productCtrl.delete);

module.exports = router;
