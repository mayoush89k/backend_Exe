import mongoose from "mongoose";
const detailSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "invalid price, Price must be positive",
      },
    },
    discount: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      minlength: 2,
    },
    phoneNumber: {
      type: String,
      minlength: 2,
      maxlength: 10,
    },
    dateAdded: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default detailSchema