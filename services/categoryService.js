const Category = require('../models/categoryModel');
const factory = require('./handlerFactory');

// @des Get list of Categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = factory.getAll(Category);

// @des Get specific category by Id
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category);

// @des Create Categories
// @route POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(Category);

// @des update specific category by Id
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = factory.updateOne(Category);

// @des delete specific category by Id
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = factory.deleteOne(Category);
