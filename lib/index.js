const ProductModel = require('../models');

const CustomError = require('../utils/error');
module.exports = {
	createProduct: (product) => {
		return new Promise((resolve, reject) => {
			const newProduct = {
				name: product.name,
				code: product.code,
				quantity: product.quantity,
				amount: product.amount,
				expiry: product.expiry
			};
			
			ProductModel.findOne({
					name: newProduct.name
				}).exec()
				.then((result) => {
					if (result) {
						throw CustomError.throwError(201);
					} else {
						return new ProductModel(newProduct).save();
					}
				})
				.then((result) => {
					resolve(result)
				})
				.catch((error) => {
					reject(error);
				})
		})
	},
	getProduct: (productId) => {
		return new ProductModel.findById({
			_id: productId
		}).lean().exec();
	},
	getAllProducts: (limit, skip) => {
		skip = parseInt(skip) || 0;
		limit = parseInt(limit) || 20;

		return ProductModel.find({}).skip(skip).limit(limit).lean().exec();
	},
	updateProduct: (product) => {
		
		let updatedProduct = {
			name: product.name,
			code: product.code,
			quantity: product.quantity,
			expiry: product.expiry
		}
		
		return ProductModel.findOneAndUpdate({
			_id: product._id
		}, updatedProduct, {
			new: true
		}).exec();
	},
	deleteProduct: (productId) => {
		return  ProductModel.findByIdAndRemove({
			_id: productId
		});
	}
}