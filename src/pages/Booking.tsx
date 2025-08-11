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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary-500 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Book Your Table</h1>
          <div className="flex items-center space-x-4">
            <h2 className="text-lg">{selectedRestaurant.name}</h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{selectedRestaurant.cuisine}</span>
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
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
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
                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
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
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary-500 hover:text-primary-600"
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(Math.min(20, guests + 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary-500 hover:text-primary-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Special Requests (Optional)
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
              placeholder="Any dietary restrictions, celebrations, or special accommodations..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
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
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-semibold text-primary-600">${guests * 25}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !selectedDate || !selectedTime}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
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
  );
};

export default Booking;