// Dependencies
const mongoose = require("mongoose");

// Schema
const orderSchema = new mongoose.Schema(
    {
        userId: String,

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

        country: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
        },

        streetAddress: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
        },

        city: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
        },

        state: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
        },

        postCode: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
        },

        notes: {
            type: String,
            maxlength: 255,
            trim: true,
        },

        products: [
            {
                id: String,
                title: String,
                price: Number,
                thumbnail: String,
                quantity: Number,
            },
        ],

        totalPrice: {
            type: Number,
            default: 0,
            trim: true,
            required: true,
        },

        status: {
            type: String,
            maxlength: 255,
            trim: true,
        },
    },

    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

// Export
module.exports = Order;
