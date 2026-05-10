const mongoose = require("mongoose");
const { Status } = require("../../config/constants");

const VariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    attributes: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
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
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sku: {
      type: String,
      required: true,
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
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  },
);

const VariantModel = mongoose.model("variant", VariantSchema)

module.exports = VariantModel