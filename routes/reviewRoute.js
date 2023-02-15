const express = require('express');

const {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require('../services/reviewdService');
// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require('../utlis/validators/brandValidator');

const router = express.Router();

router.route('/').get(getReviews).post(createReview);
router.route('/:id').get(getReview).put(updateReview).delete(deleteReview);

module.exports = router;
