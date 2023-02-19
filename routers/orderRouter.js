// Dependencies
const express = require("express");
const checkAdminHandler = require("../middlewares/checkAdminHandler");
const checkLoginHandler = require("../middlewares/checkLoginHandler");
const Order = require("../models/Order");

// Initialize
const orderRouter = express.Router();

// Get All
orderRouter.get("/", async (req, res) => {
  let data;

  if (req?.query?.limit) {
    data = await Order.find({}).sort("-date").limit(process.env.LIMIT);
  } 
  
  else {
    data = await (await Order.find({}).sort("-date")).reverse();
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
orderRouter.post("/", checkLoginHandler, async (req, res) => {
  const newOrder = new Order(req.body);
    // Submit To Database
    try {
      const data = await newOrder.save();
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

// Update
orderRouter.put("/:id", checkAdminHandler, async (req, res) => {
  const id = req.params.id;

    // Submit To Database
    try {
      const data = await Order.findByIdAndUpdate(id, req.body);
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

// Delete
orderRouter.delete("/:id", checkAdminHandler, async (req, res) => {
  const id = req.params.id;

    // Submit To Database
    try {
      const data = await Order.findByIdAndRemove(id);
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

// Single
orderRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  // Submit To Database
  try {
    const data = await Order.findById(id).exec();
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
module.exports = orderRouter;
