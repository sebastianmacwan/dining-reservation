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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-primary-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CreditCard className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-dark-800 mb-2">Secure Payment</h1>
            <p className="text-gray-600">Complete your reservation payment</p>
          </div>
          
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
