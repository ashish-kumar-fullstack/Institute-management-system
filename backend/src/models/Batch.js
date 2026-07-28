const mongoose = require('mongoose')
const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    students: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps: true})
