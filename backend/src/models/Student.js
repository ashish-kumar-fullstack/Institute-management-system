const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
    index: true
  },
  admissionNumber: {
    type : String,
    required: true,
    uppercase: true,
    trim: true,
    maxlength: 10
  },
  name:{
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    match: /^[6-9]\d{9}$/,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: null
  },
  courseId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Course",
  default: null
  },
  status: {
    type: String,
    enum: ["active", "inactive", "completed"],
    default: "active",
  }
},
{timestamps: true})

 const Student = mongoose.model("Student", studentSchema);
module.exports =Student