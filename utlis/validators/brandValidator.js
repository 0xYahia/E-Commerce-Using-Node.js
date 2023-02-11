const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand must be required")
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .isLength({ max: 32 })
    .withMessage("Too long name"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .isLength({ max: 32 })
    .withMessage("Too long name"),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware,
];
