const Product = require('../lib');
const ResponseHandler = require('../utils/response');

module.exports = {
	addProduct: (request, response) => {
		const product = request.body;

		Product.createProduct(product)
			.then((product) => {
				ResponseHandler.sendSuccess(response, product, "product")
			})
			.catch((error) => {
				ResponseHandler.sendError(response, error)
			})
	},
	getProduct: (request, response) => {
		const productId = request.params.id;
		
		Product.getProduct(productId)
			.then((product) => {
				ResponseHandler.sendSuccess(response, product, "product")
			})
			.catch((error) => {
				ResponseHandler.sendError(response, error)
			})
	},
	getAllProducts: (request, response) => {
		Product.getAllProducts()
			.then((product) => {
				
				ResponseHandler.sendSuccess(response, product, "product")
			})
			.catch((error) => {
				console.log(error)
				ResponseHandler.sendError(response, error);
			})
	},
	updateProduct: (request, response) => {
		let product = request.body;
		
		Product.updateProduct(product)
			.then((product) => {
				ResponseHandler.sendSuccess(response, product, "product")

			})
			.catch((error) => {
				ResponseHandler.sendError(response, error)
			})
	},
	deleteProduct: (request, response) => {
		let productId = request.body.productId;
		
		Product.deleteProduct(productId)
			.then((product) => {
				ResponseHandler.sendSuccess(response, product, "product")

			})
			.catch((error) => {
				ResponseHandler.sendError(response, error)
			})
	}
}