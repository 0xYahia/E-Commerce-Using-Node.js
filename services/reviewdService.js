const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// @des Get list of reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = factory.getAll(Review);

// @des Get specific brand by Id
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = factory.getOne(Review);

// @des Create brand
// @route POST /api/v1/reviews
// @access Private/Protect/User
exports.createReview = factory.createOne(Review);

// @des update specific brand by Id
// @route PUT /api/v1/reviews/:id
// @access Private/Protect/User
exports.updateReview = factory.updateOne(Review);

// @des delete specific brand by Id
// @route DELETE /api/v1/reviews/:id
// @access Private/Protect/User-Admin-Manager
exports.deleteReview = factory.deleteOne(Review);
