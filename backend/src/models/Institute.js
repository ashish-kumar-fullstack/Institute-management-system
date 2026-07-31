const mongoose = require('mongoose')

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true, 
    trim: true,
    maxLength:120
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-zA-Z0-9-]+$/
  },
  status:{
    type: String,
    enum: ["active","suspended", "inactive"],
    default: "active",
    index: true
  },
  ownerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    default: null
  },
  setting: {
    currency: {type: String, default: "INR"},
    timezone: {type: String , default: "Asia/Kolkata"},
    dateFormate: {type: String, default: "DD-MM-YYYY"}
  }
},
{timestamps: true})

 const Tenant = mongoose.model("Tenant", tenantSchema);
module.exports = Tenant