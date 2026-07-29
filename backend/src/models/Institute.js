const mongoose = require('mongoose')
const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Institute name is required"]
    },
    ownerName:{
        type: String,
        required: [true, "Owner name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    logo:{
        type: String,
        default: ""
    },
    address:{
        line1: String,
        line2: String,
        city: String,
        district: String,
        state: String,
        country: {
            type: String,
            default: "India"
        },
        pincode: String,
    },
    subscription: {
      plan: {
        type: String,
        enum: ["trial", "basic", "professional", "enterprise"],
        default: "trial",
      },

      status: {
        type: String,
        enum: ["trial", "active", "expired", "suspended", "cancelled"],
        default: "trial",
      },

      startDate: Date,
      expiresAt: Date,

      studentLimit: {
        type: Number,
        default: 100,
      },

      branchLimit: {
        type: Number,
        default: 1,
      },
    },
    }
, {timestamps: true})

const Institute = mongoose.model('Institute', instituteSchema)

module.exports = Institute;