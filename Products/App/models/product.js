'use strict';
const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Le titre ne peut pas être vide'],
			unique: true,
		},
		description: {
			type: String,
			required: [true, 'La description ne peut pas être vide'],
		},
		price: {
			type: Number,
			required: [true, 'Le prix ne peut pas être vide'],
		},
	},
	{ timestamps: true }
);
productSchema.pre('save', async function (next) {
	this.lastUpdated = Date.now();
	next();
  });
  
  productSchema.pre('findOneAndUpdate', function (next) {
		this._update.lastUpdated = Date.now();
		next();
	  });
productSchema.plugin(uniqueValidator);

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;