const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectID,
          ref: 'Prdouct',
        },
        quantity: Number,
        color: String,
        price: Number,
      },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
      type: mongoose.Schema.ObjectID,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
