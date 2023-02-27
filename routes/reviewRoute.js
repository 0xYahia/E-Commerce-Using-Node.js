const express = require('express');

const {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require('../services/reviewService');
// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require('../utlis/validators/brandValidator');

const authService = require('../services/authService');

const router = express.Router();

router
  .route('/')
  .get(getReviews)
  .post(authService.protect, authService.allowedTo('user'), createReview);
router
  .route('/:id')
  .get(getReview)
  .put(authService.protect, authService.allowedTo('user'), updateReview)
  .delete(
    authService.protect,
    authService.allowedTo('user', 'manager', 'admin'),
    deleteReview
  );

module.exports = router;
