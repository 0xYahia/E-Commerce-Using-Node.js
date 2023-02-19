const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
const factory = require('./handlerFactory');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

exports.uploadCategoryImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, file, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${filename}`);
  }

  // save image into our db
  req.body.image = filename;
  next();
});

// @des Get list of Categories
// @route GET /api/v1/categories
// @access Publics
exports.getCategories = factory.getAll(Category);

// @des Get specific category by Id
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category);

// @des Create Categories
// @route POST /api/v1/categories
// @access Private/Admin-Manager
exports.createCategory = factory.createOne(Category);

// @des update specific category by Id
// @route PUT /api/v1/categories/:id
// @access Private/Admin-Manager
exports.updateCategory = factory.updateOne(Category);

// @des delete specific category by Id
// @route DELETE /api/v1/categories/:id
// @access Private/Admin
exports.deleteCategory = factory.deleteOne(Category);
