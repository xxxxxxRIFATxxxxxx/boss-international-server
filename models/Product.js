// Dependencies
const mongoose = require("mongoose");

// Schema
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 255,
            trim: true,
        },

        price: {
            type: Number,
            default: 0,
            trim: true,
        },

        thumbnail: String,

        rating: {
            type: String,
            default: 0,
            trim: true,
        },

        reviews: [
            {
                name: String,
                description: String,
                date: String,
            },
        ],

        description: {
            type: String,
            trim: true,
        },

        availability: {
            type: String,
            maxlength: 255,
            trim: true,
        },

        shipping: {
            type: String,
            maxlength: 255,
            trim: true,
        },

        weight: {
            type: String,
            maxlength: 255,
            trim: true,
        },

        category: {
            type: String,
            maxlength: 255,
            trim: true,
        },

        images: [String],
    },

    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

// Export
module.exports = Product;
