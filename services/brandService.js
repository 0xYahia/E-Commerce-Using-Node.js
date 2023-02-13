const Brand = require('../models/brandModel');
const factory = require('./handlerFactory');

// @des Get list of brands
// @route GET /api/v1/brands
// @access Public
exports.getBrands = factory.getAll(Brand);

// @des Get specific brand by Id
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = factory.getOne(Brand);

// @des Create brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = factory.createOne(Brand);

// @des update specific brand by Id
// @route PUT /api/v1/brands/:id
// @access Private
exports.updateBrand = factory.updateOne(Brand);

// @des delete specific brand by Id
// @route DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrand = factory.deleteOne(Brand);
