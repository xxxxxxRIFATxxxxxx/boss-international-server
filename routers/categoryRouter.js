// Dependencies
const express = require('express');
const Category = require('../models/Category');

// Initialize
const categoryRouter = express.Router();

// Get All Categories
categoryRouter.get('/', async (req, res) => {
    try {
        const data = await Category.find({});
        res.status(200);
        res.send({
            result: data,
            message: "Success"
        });
    }

    catch (error) {
        res.status(error.status || 500);
        res.send({
            error: error.message
        });
    };
});

// Create Category
categoryRouter.post('/', async (req, res) => {
     // Submit To Database
     try {
        const data = await newCategory.save();
        res.status(200);
        res.send({
            result: data,
            message: "Success"
        });
    }

    catch (error) {
        res.status(error.status || 500);
        res.send({
            error: error.message
        });
    };
});

// Update Category
categoryRouter.put('/:id', async (req, res) => {
    const id = req.params.id;

    // Submit To Database
    try {
        const data = await Category.findByIdAndUpdate(id, req.body);
        res.status(200);
        res.send({
            result: data,
            message: "Success"
        });
    }

    catch (error) {
        res.status(error.status || 500);
        res.send({
            error: error.message
        });
    };
});

// Delete Category
categoryRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    // Submit To Database
    try {
        const data = await Category.findByIdAndRemove(id);
        res.status(200);
        res.send({
            result: data,
            message: "Success"
        });
    }

    catch (error) {
        res.status(error.status || 500);
        res.send({
            error: error.message
        });
    };
});

// Single Category
categoryRouter.get('/:id', async (req, res) => {
    const id = req.params.id;

    // Submit To Database
    try {
        const data = await Category.findById(id).exec();
        res.status(200);
        res.send({
            result: data,
            message: "Success"
        });
    }

    catch (error) {
        res.status(error.status || 500);
        res.send({
            error: error.message
        });
    };
});

// Export
module.exports = categoryRouter;