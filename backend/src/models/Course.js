const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    code: {
        type: String,
        required: true,
        Uppercase: true,
        trim: true,
        maxlength: 10
    },
    durationInMonths: {
        type: Number,
        required: true,
        min : 1,
        max : 120,
    },
    feeAmount: {
        type : Number, 
        required: true,
        min : 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    }

},
{timestamps: true})

 const Course = mongoose.model("Course", courseSchema);
 module.exports = Course