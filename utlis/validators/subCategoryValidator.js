const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category must be required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory  name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory  name"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory  name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory  name"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];
