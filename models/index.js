'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

/**
 * [ProductSchema holds details related to product]
 * @type {Object}
*/

const ProductSchema = new Schema({
	name: {
		type: String,
		lowercase: true,
		trim: true,
		index: true,
		required: "Name is Required",
	},
	code: {
		type: String,
		index: true,
		trim: true,
		required: "Code is Required",
	},
	quantity: {
		type: Number,
		trim: true,
		required: "Quantity is Required"
	},
	expiry: {
		type: String,
		trim: true,
		required: "Expiry Date is Required",
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);