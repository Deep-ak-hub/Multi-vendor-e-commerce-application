const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["select", "text", "number"],
        required: true
    },
    values: [{
        type: String,
        trim: true
    }],
    isVariant: {
        type: Boolean,
        default: false
    },
    isrequired: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  },
);

const AttributeModel = mongoose.model("attribute", attributeSchema);

module.exports = AttributeModel;
