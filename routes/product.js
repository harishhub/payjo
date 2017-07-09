const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/')

router.route('/')
	.get(ProductCtrl.getAllProducts)
	.post(ProductCtrl.addProduct)
	.put(ProductCtrl.updateProduct)
	.delete(ProductCtrl.deleteProduct);

router.route('/:id')
	.get(ProductCtrl.getProduct)

module.exports = router;