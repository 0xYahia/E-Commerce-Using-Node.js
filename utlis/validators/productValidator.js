/* eslint-disable array-callback-return */
const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const subCategories = require("../../models/subcCategoryModel");
const Product = require("../../models/productModel");

exports.createPoductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product title is required"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Proudct quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Productt sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("priceAfterDiscount must be a number")
    .isFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product color should be array of string"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("product must be blong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No categoty for this id: ${categoryId}`)
          );
        }
      })
    ),
  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subCategoriesIds) =>
      subCategories
        .find({ _id: { $exists: true, $in: subCategoriesIds } })
        .then((result) => {
          if (result.length < subCategoriesIds.length) {
            return Promise.reject(new Error(`Invalid subCategories Ids`));
          }
        })
    )
    .custom((val, { req }) =>
      subCategories
        .find({ category: req.body.category })
        .then((subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          // check if subcategories ids in db include subcategories in req.body (true)
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`subcategories not belong to category`)
            );
          }
        })
    ),
  // .custom((val, { req }) => {
  //   subCategories
  //     .find({ category: req.body.category })
  //     .then((subcategories) => {
  //       const subCateogriesIdsInDB = [];
  //       subcategories.forEach((subCategory) => {
  //         subCateogriesIdsInDB.push(subCategory._id.toString());
  //       });
  //       // check if subcategories ids in db include subcategories in req.body (true / false)
  //       const checker = (target, arr) => target.every((v) => arr.includes(v));
  //       if (!checker(val, subCateogriesIdsInDB)) {
  //         return Promise.reject(
  //           new Error(`subcategories not belong to category`)
  //         );
  //       }
  //     });
  // }),
  // .custom(async (val, { req }) => {
  //   const subcategory = await subCategories.find({
  //     category: req.body.category,
  //   });
  //   const subCategoriesIdsInDB = [];
  //   subcategory.forEach((subCaegory) => {
  //     subCategoriesIdsInDB.push(subCaegory._id.toString());
  //   });
  //   console.log(subCategoriesIdsInDB);
  //   // check if subcategories ids in db include subcategories in req.body (true)
  //   const checker = val.every((v) => {
  //     subCategoriesIdsInDB.includes(v);
  //   });
  // check if subcategories ids in db include subcategories in req.body (true)
  // const checker = (target, arr) => target.every((v) => arr.includes(v));
  // if (!checker(val, subCategoriesIdsInDB)) {
  //   return Promise.reject(
  //     new Error(`subcategories not belong to category`)
  //   );
  // }
  // }),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("ratingsAverage must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("ratingsAverage must be below or equal 5.0"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingQuantity must be a number"),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .optional(),
  check("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("Proudct quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Productt sold must be a number"),
  check("price")
    .optional()
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("priceAfterDiscount must be a number")
    .isFloat()
    .custom(async (value, { req }) => {
      const sepecificProduct = await Product.findById(req.params.id);
      if (req.body.price || sepecificProduct.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product color should be array of string"),
  check("imageCover").optional(),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images should be array of string"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No categoty for this id: ${categoryId}`)
          );
        }
      })
    ),
  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subCategoriesIds) =>
      subCategories
        .find({ _id: { $exists: true, $in: subCategoriesIds } })
        .then((result) => {
          console.log(result.length);
          if (result.length < subCategoriesIds.length) {
            return Promise.reject(new Error(`Invalid subCategories Ids`));
          }
        })
    ),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("ratingsAverage must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("ratingsAverage must be below or equal 5.0"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingQuantity must be a number"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];
