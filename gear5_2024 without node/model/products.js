const mongoose = require("../config/database")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // the image is stored as a URL
    required: true,
  },
  review: {
    stars: {
      type: Number,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Product", productSchema)
