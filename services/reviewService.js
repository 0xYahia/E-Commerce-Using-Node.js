const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// @des Get list of reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = factory.getAll(Review);

// @des Get specific review by Id
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = factory.getOne(Review);

// @des Create review
// @route POST /api/v1/reviews
// @access Protect/User
exports.createReview = factory.createOne(Review);

// @des update specific review by Id
// @route PUT /api/v1/reviews/:id
// @access Protect/User
exports.updateReview = factory.updateOne(Review);

// @des delete specific review by Id
// @route DELETE /api/v1/reviews/:id
// @access Protect/User-Admin-Manager
exports.deleteReview = factory.deleteOne(Review);
