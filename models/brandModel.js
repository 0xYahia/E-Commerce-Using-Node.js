const mongoose = require('mongoose');

// 1- Create Schema
const brandShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand must be required'],
      unique: [true, 'Brand must be unique'],
      minlength: [3, 'Too short name'],
      maxlength: [32, 'Too long name'],
    },
    // A and b => shopping.com/a-and-b
    slug: {
      type: String,
      lowerase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
    console.log(process.env.BASE_URL);
  }
};

// findOne, findAll and update
brandShema.post('init', (doc) => {
  setImageUrl(doc);
});

// create
brandShema.post('save', (doc) => {
  setImageUrl(doc);
});

// 2- Create Model
module.exports = mongoose.model('Brand', brandShema);
