// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CreditCard, Lock, CheckCircle } from 'lucide-react';
// import { useBooking } from '../contexts/BookingContext';
// import { useAuth } from '../contexts/AuthContext';

// const Payment: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { selectedRestaurant, selectedDate, selectedTime, guests, currentBooking } = useBooking();
//   const [loading, setLoading] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [cardDetails, setCardDetails] = useState({
//     number: '',
//     expiry: '',
//     cvv: '',
//     name: '',
//   });

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     if (!selectedRestaurant || !selectedDate || !selectedTime) {
//       navigate('/restaurants');
//     }
//   }, [user, selectedRestaurant, selectedDate, selectedTime, navigate]);

//   const handleCardDetailsChange = (field: string, value: string) => {
//     setCardDetails(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const formatCardNumber = (value: string) => {
//     // Remove all non-digit characters
//     const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
//     // Add a space every 4 digits
//     const matches = v.match(/\d{4,16}/g);
//     const match = matches && matches[0] || '';
//     const parts = [];
//     for (let i = 0, len = match.length; i < len; i += 4) {
//       parts.push(match.substring(i, i + 4));
//     }
//     if (parts.length) {
//       return parts.join(' ');
//     } else {
//       return v;
//     }
//   };

//   const handlePayment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate payment processing
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     try {
//       // In a real app, you would integrate with Stripe or another payment processor
//       const paymentData = {
//         bookingId: currentBooking?.id,
//         amount: guests * 25,
//         paymentMethod,
//         cardDetails: paymentMethod === 'card' ? cardDetails : null,
//       };

//       // Simulate payment success
//       setPaymentSuccess(true);
      
//       // Redirect to dashboard after a delay
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 3000);

//     } catch (error) {
//       console.error('Payment failed:', error);
//       alert('Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (paymentSuccess) {
//     return (
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center">
//           <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
//           <p className="text-gray-600 mb-6">
//             Your table has been reserved at {selectedRestaurant?.name}.
//           </p>
//           <div className="bg-green-50 p-6 rounded-lg border border-green-200">
//             <h3 className="text-lg font-semibold text-green-800 mb-2">Booking Confirmed</h3>
//             <div className="text-green-700">
//               <p><strong>Restaurant:</strong> {selectedRestaurant?.name}</p>
//               <p><strong>Date:</strong> {selectedDate}</p>
//               <p><strong>Time:</strong> {selectedTime}</p>
//               <p><strong>Guests:</strong> {guests}</p>
//               <p><strong>Total:</strong> ${guests * 25}</p>
//             </div>
//           </div>
//           <p className="text-gray-600 mt-4">
//             You will be redirected to your dashboard shortly...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Payment Form */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="flex items-center mb-6">
//             <Lock className="text-green-500 mr-2" size={20} />
//             <h2 className="text-2xl font-bold text-gray-900">Secure Payment</h2>
//           </div>

//           <form onSubmit={handlePayment} className="space-y-6">
//             {/* Payment Method */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Payment Method
//               </label>
//               <div className="space-y-3">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="card"
//                     checked={paymentMethod === 'card'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="mr-3"
//                   />
//                   <CreditCard size={20} className="mr-2" />
//                   Credit/Debit Card
//                 </label>
//               </div>
//             </div>

//             {paymentMethod === 'card' && (
//               <div className="space-y-4">
//                 {/* Card Number */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="1234 5678 9012 3456"
//                     value={cardDetails.number}
//                     onChange={(e) => handleCardDetailsChange('number', formatCardNumber(e.target.value))}
//                     maxLength={19}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                 </div>

//                 {/* Name on Card */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Name on Card
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="John Doe"
//                     value={cardDetails.name}
//                     onChange={(e) => handleCardDetailsChange('name', e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                 </div>

//                 {/* Expiry and CVV */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Expiry Date
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="MM/YY"
//                       value={cardDetails.expiry}
//                       onChange={(e) => {
//                         let value = e.target.value.replace(/\D/g, '');
//                         if (value.length >= 2) {
//                           value = value.substring(0, 2) + '/' + value.substring(2, 4);
//                         }
//                         handleCardDetailsChange('expiry', value);
//                       }}
//                       maxLength={5}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       CVV
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="123"
//                       value={cardDetails.cvv}
//                       onChange={(e) => handleCardDetailsChange('cvv', e.target.value.replace(/\D/g, ''))}
//                       maxLength={4}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
//             >
//               {loading ? (
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//               ) : (
//                 `Pay $${guests * 25}`
//               )}
//             </button>

//             <div className="text-center text-sm text-gray-600">
//               <Lock className="inline mr-1" size={16} />
//               Your payment information is secure and encrypted
//             </div>
//           </form>
//         </div>

//         {/* Booking Summary */}
//         <div className="bg-gray-50 rounded-lg p-6">
//           <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
          
//           {selectedRestaurant && (
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={selectedRestaurant.image}
//                   alt={selectedRestaurant.name}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-gray-900">{selectedRestaurant.name}</h4>
//                   <p className="text-gray-600">{selectedRestaurant.cuisine}</p>
//                 </div>
//               </div>

//               <div className="border-t pt-4 space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Date:</span>
//                   <span className="font-medium">{selectedDate}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Time:</span>
//                   <span className="font-medium">{selectedTime}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Guests:</span>
//                   <span className="font-medium">{guests}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Price per person:</span>
//                   <span className="font-medium">$25</span>
//                 </div>
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between text-lg font-bold">
//                   <span>Total:</span>
//                   <span className="text-primary-600">${guests * 25}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;
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
