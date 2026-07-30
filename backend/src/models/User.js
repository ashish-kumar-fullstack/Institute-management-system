const mongoose = require("mongoose");
const { USER_ROLE } = require("../constants/Role");

const userSchema = new mongoose.Schema(
  {
    InstituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
      index: true,
    },
    role: {
        type: String,
        enum: USER_ROLE,
        default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
