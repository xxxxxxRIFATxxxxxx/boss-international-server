// Dependencies
const express = require("express");
const Stripe = require("stripe");
const dotenv = require('dotenv');

// Initialize
dotenv.config();
const paymentRouter = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

paymentRouter.get('/', async (req, res) => {
  try {
    res.status(200);
    res.send({
      result: "Payment Home",
      message: "Success",
    });
  } catch (error) {
    res.status(error.status || 500);
    res.send({
      error: error.message,
    });
}
});

paymentRouter.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.cart.map((product) => {
        return (
            {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: product.title,
                    // images: [product.thumbnail],
                    metadata: {
                        id: product.id
                    }
                  },
                  unit_amount: product.price * 100,
                },
                quantity: product.quantity,
              }
        )
    })

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });
    
    res.send({
        url: session.url
    });
  });

// Export
module.exports = paymentRouter;
