const express = require('express');

const {
  getproducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require('../services/productService');
const {
  createPoductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator');

const authService = require('../services/authService');

const router = express.Router();

router
  .route('/')
  .get(getproducts)
  .post(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    createPoductValidator,
    createProduct
  );
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
