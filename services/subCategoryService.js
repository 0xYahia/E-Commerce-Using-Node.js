const SubCategory = require('../models/subcCategoryModel');
const factory = require('./handlerFactory');

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
// GET /api/v1/proudcts/:productId/reviews

exports.cerateFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @des Get list of subCategories
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = factory.getAll(SubCategory);

// @des Get specific subCategory by Id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = factory.getOne(SubCategory);

// @des Create subCategories
// @route POST /api/v1/subcategories
// @access Private
exports.createSubCategory = factory.createOne(SubCategory);

// @des update specific subCategory by Id
// @route PUT /api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @des delete specific subCategory by Id
// @route DELETE /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
