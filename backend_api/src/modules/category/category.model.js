// name, slug, parentId ,image, brands, (_id, status, createdBy, updatedBy, createdAt, updatedAt)

const mongoose = require("mongoose");
const {Status} = require("../../config/constants")
const CategorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        min: 2,
        max: 50,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    image: {
        publicId: String,
        url: String,
        thumbUrl: String
    },
    brands: [{
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        default: null
    }],
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.INACTIVE
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema)

module.exports = CategoryModel