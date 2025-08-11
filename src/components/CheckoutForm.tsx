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
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || loading} style={{ marginTop: "20px" }}>
        {loading ? "Processing..." : "Pay now"}
      </button>
      {message && <div style={{ marginTop: "10px", color: "red" }}>{message}</div>}
    </form>
  );
};

export default CheckoutForm;