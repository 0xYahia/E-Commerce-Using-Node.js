const express = require('express');

const {
  createSubCategories,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  cerateFilterObf,
} = require('../services/subCategoryService');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utlis/validators/subCategoryValidator');

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategories)
  .get(cerateFilterObf, getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
