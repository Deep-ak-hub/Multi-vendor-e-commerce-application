const mongoose = require("mongoose");
const { UserRoles, Gender, Status } = require("../../config/constants");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.CUSTOMER,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: null,
    },
    dob: Date,
    address: String,
    image: {
      publicId: String,
      url: String,
      thumbUrl: String,
    },

    activationToken: {
      type: String,
      index: true
    },
    forgetPasswordToken: String,
    expiryTime: Date,

    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
