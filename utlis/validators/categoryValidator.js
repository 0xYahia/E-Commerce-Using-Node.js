const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category must be required")
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .isLength({ max: 32 })
    .withMessage("Too long name"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .isLength({ max: 32 })
    .withMessage("Too long name"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
