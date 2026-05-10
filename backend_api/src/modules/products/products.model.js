// _id, name, slug, description, price, discount, afterDiscount, category, brand, seller, status, isFeatured, images, createdAt, updatedAt

const mongoose = require("mongoose");
const { Status } = require("../../config/constants");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 200,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    hasVariants: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      min: 1000,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 90,
      default: 0,
    },
    afterDiscount: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [{
      publicId: String,
      url: String,
      thumbUrl: String,
    }],
    isFeatured: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  },
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
