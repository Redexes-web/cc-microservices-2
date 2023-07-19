const Product = require('../models/product');

exports.create = async (req, res) => {
	try {
		const product = new Product({
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
		});

		res.status(201).json(await product.save());
	} catch (error) {
		return res.status(500).send(error.message || 'Error creating product');
	}
};

exports.get = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message || 'Error getting products');
	}
};

exports.getById = async (req, res) => {
	const productId = req.params.id;

	try {
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(product);
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message || 'Error getting product');
	}
};

exports.update = async (req, res) => {
	const productId = req.params.id;

	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			{
				title: req.body.title,
				description: req.body.description,
				price: req.body.price,
			},
			{ new: true }
		);
		if (!updatedProduct) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(updatedProduct);
	} catch (error) {
		console.error(error);
		return res.status(500).send(error.message || 'Error updating product');
	}
};

exports.delete = async (req, res) => {
	const productId = req.params.id;

	try {
		const deletedProduct = await Product.findByIdAndDelete(productId);
		if (!deletedProduct) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(deletedProduct);
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message || 'Error deleting product');
	}
};
