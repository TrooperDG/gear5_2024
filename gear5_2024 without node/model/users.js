const mongoose = require("../config/database")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      dateCreated: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  cartTotal: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model("User", userSchema)


