// Dependencies
const express = require("express");
const Product = require("../models/Product");

// Initialize
const productRouter = express.Router();

// Get All Products
productRouter.get("/", async (req, res) => {
  let data;

  if (req?.query?.limit) {
    data = await Product.find({}).sort("-date").limit(12);
  } else if (req?.query?.category) {
    data = await Product.find({ category: req?.query?.category }).sort("-date");
  } else {
    data = await (await Product.find({}).sort("-date")).reverse();
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

// Create Product
productRouter.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

    // Submit To Database
    try {
      const data = await newProduct.save();
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

// Update Product
productRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

    // Submit To Database
    try {
      const data = await Product.findByIdAndUpdate(id, req.body);
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

// Delete Product
productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

    // Submit To Database
    try {
      const data = await Product.findByIdAndRemove(id);
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

// Single Product
productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  // Submit To Database
  try {
    const data = await Product.findById(id).exec();
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

// Export
module.exports = productRouter;
