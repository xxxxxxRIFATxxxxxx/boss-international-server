// Dependencies
const express = require("express");
const checkAdminHandler = require("../middlewares/checkAdminHandler");
const Product = require("../models/Product");

// Initialize
const productRouter = express.Router();

// Get All
productRouter.get("/", async (req, res) => {
    let data;

    if (req?.query?.limit) {
        data = await Product.find({}).sort("-date").limit(process.env.LIMIT);
    } else if (req?.query?.category) {
        data = await Product.find({ category: req?.query?.category }).sort(
            "-date"
        );
    } else if (req?.query?.title) {
        // data = await Product.find({ title: req?.query?.title }).sort("-date");
        const allData = (data = await (
            await Product.find({}).sort("-date")
        ).reverse());

        let newData = [];

        allData.map((product) => {
            const productTitle = product.title.toLowerCase();
            const searchTitle = req?.query?.title.toLowerCase();

            if (productTitle.includes(searchTitle)) {
                newData.push(product);
            }
        });

        data = newData;
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

// Create
productRouter.post("/", checkAdminHandler, async (req, res) => {
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

// Update
productRouter.put("/:id", checkAdminHandler, async (req, res) => {
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

// Delete
productRouter.delete("/:id", checkAdminHandler, async (req, res) => {
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

// Single
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
