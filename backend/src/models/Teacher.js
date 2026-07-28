const mongoose = require('mongoose')
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    subjects: {
        type: Array,
        required: true
    },
    salary: {
        type: Number,
        required: true
} 
},{timestamps: true})