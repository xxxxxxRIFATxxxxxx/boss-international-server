// Dependencies
const express = require('express');
const checkAdminHandler = require('../middlewares/checkAdminHandler');
const Category = require('../models/Category');

// Initialize
const categoryRouter = express.Router();

// Get All
categoryRouter.get('/', async (req, res) => {
    let data;

    if (req?.query?.title) {
        data = await Category.find({ title: req?.query?.title }).sort("-date");
    }
  
    else {
        data = await (await Category.find({}).sort("-date")).reverse();
    }

  try {
    res.status(200);
    res.send({
      result: data,
      message: "Success",
    });
  } catch (error) {
    res.status(error.status || 500);
    res.send({
      error: error.message,
    });
  }
});

// Create
categoryRouter.post('/', checkAdminHandler, async (req, res) => {
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

// Update
categoryRouter.put('/:id', checkAdminHandler, async (req, res) => {
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

// Delete
categoryRouter.delete('/:id', checkAdminHandler, async (req, res) => {
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

// Single
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