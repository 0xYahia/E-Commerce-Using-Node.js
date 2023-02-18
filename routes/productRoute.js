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
} = require('../utlis/validators/productValidator');

const router = express.Router();

router
  .route('/')
  .get(getproducts)
  .post(
    uploadProductImages,
    resizeProductImages,
    createPoductValidator,
    createProduct
  );
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
