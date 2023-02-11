const express = require("express");

const {
  getproducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");
const {
  createPoductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utlis/validators/productValidator");

const router = express.Router();

router.route("/").get(getproducts).post(createPoductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
