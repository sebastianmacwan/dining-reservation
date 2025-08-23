// CheckoutForm.tsx
import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // Add this check to ensure the PaymentElement is mounted and ready
    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
        setMessage("Payment Element is not ready. Please try again.");
        return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (error) {
      setMessage(error.message || "An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button 
        disabled={!stripe || loading} 
        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center"
      >
        {loading ? "Processing..." : "Pay now"}
      </button>
      {message && (
        <div className="mt-4 p-4 border border-red-500 text-red-700 bg-red-100 rounded-xl text-sm">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;