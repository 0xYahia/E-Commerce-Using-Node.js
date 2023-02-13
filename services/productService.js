const Product = require('../models/productModel');
const factory = require('./handlerFactory');

// @des Get list of Products
// @route GET /api/v1/products
// @access Public
exports.getproducts = factory.getAll(Product);

// @des Get specific product by Id
// @route GET /api/v1/products/:id
// @access Public
exports.getProduct = factory.getOne(Product);

// @des Create products
// @route POST /api/v1/products
// @access Private
exports.createProduct = factory.createOne(Product);

// @des update specific product by Id
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = factory.updateOne(Product);

// @des delete specific product by Id
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = factory.deleteOne(Product);
