const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Brand = require("../models/brandModel");
const ApiError = require("../utlis/apiError");

// @des Get list of brands
// @route GET /api/v1/brands
// @access Public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;

  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({
    result: brands.length,
    page,
    data: brands,
  });
  res.send();
});

// @des Get specific brand by Id
// @route GET /api/v1/brands/:id
// @access Public

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @des Create brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @des update specific brand by Id
// @route PUT /api/v1/brands/:id
// @access Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @des delete specific brand by Id
// @route DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(204).json();
});
