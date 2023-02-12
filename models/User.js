// Dependencies
const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true,
    },

    phone: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        trim: true,
        required: true,
    },

    role: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true,
    }
},

    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

// Export
module.exports = User;