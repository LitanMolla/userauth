const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'moderator', 'user'],
        default: 'user'
    },
    permission: {
        type: [String]
    }
}, { timestamps: true })