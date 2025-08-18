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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 pt-20">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-primary-100">
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="text-primary-600 w-12 h-12" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-dark-800 mb-4">Payment Complete</h1>
                {message ? (
                    <div className="bg-primary-50 p-4 rounded-xl border border-primary-200 mb-4">
                        <p className="text-primary-700 break-words">{message}</p>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
                        <p className="text-gray-600">Verifying payment details...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
