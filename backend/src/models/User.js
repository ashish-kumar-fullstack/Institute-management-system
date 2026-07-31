const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["institute_admin", "teacher", "accountant"],
      default: "institute_admin",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Email must be unique only inside one institute
userSchema.index(
  {
    instituteId: 1,
    email: 1,
  },
  {
    unique: true,
  }
);

// Used during registration
userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 12);
};

// Used during login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;