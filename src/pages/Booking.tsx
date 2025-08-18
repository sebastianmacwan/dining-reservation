import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, CreditCard } from 'lucide-react';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';

const Booking: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedRestaurant, timeSlots, fetchTimeSlots, setBookingDetails, createBooking } = useBooking();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    generateAvailableDates();
  }, [user, navigate]);

  useEffect(() => {
    if (selectedDate && restaurantId) {
      fetchTimeSlots(restaurantId, selectedDate);
    }
  }, [selectedDate, restaurantId, fetchTimeSlots]);

  const generateAvailableDates = () => {
    const dates = [];
    const today = startOfDay(new Date());
    
    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i);
      dates.push(format(date, 'yyyy-MM-dd'));
    }
    
    setAvailableDates(dates);
    if (!selectedDate) {
      setSelectedDate(dates[0]);
    }
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !restaurantId) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    const bookingData = {
      restaurantId,
      restaurantName: selectedRestaurant?.name,
      date: selectedDate,
      time: selectedTime,
      guests,
      specialRequests,
      totalAmount: guests * 25, // Base price per person
    };

    setBookingDetails(selectedDate, selectedTime, guests);
    
    const success = await createBooking(bookingData);
    
    if (success) {
      navigate('/payment');
    } else {
      alert('Failed to create booking. Please try again.');
    }
    
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  };

  if (!selectedRestaurant) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h1>
          <p className="text-gray-600">Please select a restaurant first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-primary-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Book Your Table</h1>
          <div className="flex items-center space-x-4">
            <h2 className="text-lg">{selectedRestaurant.name}</h2>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">{selectedRestaurant.cuisine}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Date Selection */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Calendar className="mr-2" size={20} />
              Select Date
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableDates.slice(0, 12).map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 text-center rounded-lg border transition-all ${
                    selectedDate === date
                      ? 'border-primary-500 bg-primary-100 text-primary-700 shadow-lg'
                      : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="text-sm font-medium">
                    {isToday(date) ? 'Today' : format(new Date(date), 'EEE')}
                  </div>
                  <div className="text-xs text-gray-600">
                    {format(new Date(date), 'MMM dd')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Clock className="mr-2" size={20} />
              Select Time
            </label>
            {timeSlots.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => handleTimeSlotSelect(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 text-center rounded-lg border transition-all ${
                      !slot.available
                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                        : selectedTime === slot.time
                        ? 'border-primary-500 bg-primary-100 text-primary-700 shadow-lg'
                        : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSlotSelect(time)}
                    className={`p-3 text-center rounded-lg border transition-all ${
                      selectedTime === time
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guest Count */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Users className="mr-2" size={20} />
              Number of Guests
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-12 h-12 rounded-xl border border-gray-300 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                -
              </button>
              <span className="text-2xl font-bold w-16 text-center text-primary-600">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(Math.min(20, guests + 1))}
                className="w-12 h-12 rounded-xl border border-gray-300 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-lg font-semibold text-dark-800 mb-4">
              Special Requests (Optional)
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
              placeholder="Any dietary restrictions, celebrations, or special accommodations..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-primary-50/50 focus:bg-white shadow-sm"
            />
          </div>

          {/* Booking Summary */}
          <div className="bg-primary-50/50 p-6 rounded-xl border border-primary-200">
            <h3 className="text-lg font-semibold text-dark-800 mb-4">Booking Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Restaurant:</span>
                <span className="font-medium">{selectedRestaurant.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{selectedDate ? formatDate(selectedDate) : 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTime || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-medium">{guests}</span>
              </div>
              <div className="border-t border-primary-300 pt-3 flex justify-between">
                <span className="font-semibold text-dark-800">Total:</span>
                <span className="font-semibold text-primary-600">${guests * 25}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !selectedDate || !selectedTime}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <>
                <CreditCard className="mr-2" size={20} />
                Proceed to Payment
              </>
            )}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Booking;