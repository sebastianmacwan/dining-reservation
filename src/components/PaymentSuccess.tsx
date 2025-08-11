// Create a new file named 'PaymentSuccess.tsx' inside your 'src/components' folder

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Parse the query parameters from the URL
        const params = new URLSearchParams(location.search);
        const paymentIntent = params.get('payment_intent');
        const redirectStatus = params.get('redirect_status');

        if (redirectStatus === 'succeeded' && paymentIntent) {
            setMessage(`Payment successful! Your payment intent ID is: ${paymentIntent}`);
            setTimeout(() => navigate('/'), 3000);
        } else {
            // Handle other statuses or errors
            setMessage('Payment failed or was canceled.');
            // Optional: redirect back to the payment page after a short delay
            setTimeout(() => navigate('/payment'), 5000); 
        }
    }, [location, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="text-green-500 w-16 h-16" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Complete</h1>
                {message ? (
                    <p className="text-gray-600 break-words">{message}</p>
                ) : (
                    <p className="text-gray-600">Verifying payment details...</p>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
