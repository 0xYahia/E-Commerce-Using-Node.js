const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Product = require('../models/productModel');
const ApiError = require('../utlis/apiError');
const ApiFeatures = require('../utlis/apiFeatures');

// @des Get list of Products
// @route GET /api/v1/products
// @access Public
exports.getproducts = asyncHandler(async (req, res) => {
  // Build query
  const documentsCounts = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .pagination(documentsCounts)
    .filter()
    .search()
    .sort()
    .limitFields();

  // Execute qurey
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;

  res
    .status(200)
    .json({ result: products.length, paginationResult, data: products });
});

// @des Get specific product by Id
// @route GET /api/v1/products/:id
// @access Public

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: 'category',
    select: 'name -_id',
  });
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @des Create products
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @des update specific product by Id
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.slug) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @des delete specific product by Id
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(204).json();
});
