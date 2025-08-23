import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// ✅ Use import.meta.env to access environment variables in the browser
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    // Connect to the correct backend endpoint with the correct port and path
    fetch("http://localhost:3000/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Ensure currency matches backend (INR) and the amount meets Stripe's minimum
      body: JSON.stringify({ amount: 5000, currency: "inr" }), // Example: ₹50.00 INR
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("No clientSecret returned from backend");
        }
      })
      .catch((err) => console.error("Error creating PaymentIntent:", err));
  }, []);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stripe Payment</h1>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default Payment;
