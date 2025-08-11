// routes/payment.js
import express from 'express';
import stripe from '../config/stripe.js';

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    let { amount } = req.body;
    
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Ensure amount is integer
    amount = Math.round(amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe Payment Error:', err);
    res.status(500).json({ message: 'Payment initiation failed', error: err.message });
  }
});

export default router;
