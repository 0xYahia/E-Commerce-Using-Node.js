const mongoose = require("mongoose");

const subCategoryShema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "subCategory must be unique"],
      minLength: [2, "Too short subcategory name"],
      maxLength: [32, "Too long subcategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subCategory", subCategoryShema);
