// Dependencies
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkLoginHandler = require("../middlewares/checkLoginHandler");
const checkAdminHandler = require("../middlewares/checkAdminHandler");

// Initialize
const userRouter = express.Router();

// Get All
userRouter.get("/", async (req, res) => {
    let data;

    if (req?.query?.limit) {
        data = await User.find({}).sort("-date").limit(process.env.LIMIT);
    } else {
        data = await (await User.find({}).sort("-date")).reverse();
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
userRouter.post("/", async (req, res) => {
    try {
        const email = await User.find({ email: req.body.email });
        const phone = await User.find({ phone: req.body.phone });

        if (email && email.length > 0) {
            res.status(200);
            res.send({
                message: "Email already exists",
            });
        } else if (phone && phone.length > 0) {
            res.status(200);
            res.send({
                message: "Phone number already exists",
            });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPassword,
                role: "user",
            });

            // Submit To Database
            const data = await newUser.save();
            res.status(200);
            res.send({
                result: data,
                message: "Success",
            });
        }
    } catch (error) {
        res.status(error.status || 500);
        res.send({
            error: error.message,
        });
    }
});

// Update
userRouter.put("/:id", checkLoginHandler, async (req, res) => {
    const id = req.params.id;

    // Submit To Database
    try {
        const data = await User.findByIdAndUpdate(id, req.body);
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
userRouter.delete("/:id", checkAdminHandler, async (req, res) => {
    const id = req.params.id;

    // Submit To Database
    try {
        const data = await User.findByIdAndRemove(id);
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
userRouter.get("/:id", async (req, res) => {
    const id = req.params.id;

    // Submit To Database
    try {
        const data = await User.findById(id).exec();
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

// Login
userRouter.post("/login", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });

        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user[0].password
            );

            if (isValidPassword) {
                const token = jwt.sign(
                    {
                        userId: user[0]._id,
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        email: user[0].email,
                        phone: user[0].phone,
                        role: user[0].role,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );

                res.status(200);
                res.send({
                    access_token: token,
                    user: {
                        userId: user[0]._id,
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        email: user[0].email,
                        phone: user[0].phone,
                        role: user[0].role,
                    },
                    message: "Success",
                });
            } else {
                res.status(401);
                res.send({
                    message: "Authentication Failed",
                });
            }
        } else {
            res.status(401);
            res.send({
                message: "User already exists",
            });
        }
    } catch (error) {
        res.status(error.status || 500);
        res.send({
            error: error.message,
        });
    }
});

// Export
module.exports = userRouter;
