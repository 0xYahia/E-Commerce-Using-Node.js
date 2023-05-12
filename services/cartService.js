const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;

  const product = await Product.findById(productId);
  // 1) Get Cart for logged user
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // create cart for logged user with product
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    console.log('there is cart');
  }
});
