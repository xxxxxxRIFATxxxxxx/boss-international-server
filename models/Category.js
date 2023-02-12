// Dependencies
const mongoose = require('mongoose');

// Schema
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 255,
        trim: true
    },

    image: String,
},

    {
        timestamps: true
    }
);

const Category = mongoose.model('Category', categorySchema);

// Export
module.exports = Category;