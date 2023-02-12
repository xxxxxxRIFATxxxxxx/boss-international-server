// dependencies 
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const notFoundHandler = require('./middlewares/notFoundHandler');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');
const productRouter = require('./routers/productRouter');
const categoryRouter = require('./routers/categoryRouter');
const orderRouter = require('./routers/orderRouter');
const userRouter = require('./routers/userRouter');

// initialize
const app = express()
dotenv.config();

// database connection
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => console.log('Database Connection Successful!'))
  .catch(err => console.log(err.message));

// middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// routing setup
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

// default route
app.get('/', (req, res) => {
  res.send(`Welcome to ${process.env.APP_NAME}`);
})

// error handler
app.use(notFoundHandler);
app.use(defaultErrorHandler);

// server
app.listen(process.env.PORT, () => {
  console.log(`${process.env.APP_NAME} listening on port ${process.env.PORT}`);
});