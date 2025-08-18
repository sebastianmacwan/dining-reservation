import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Star, X, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

interface Booking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
  restaurantImage?: string;
  restaurantCuisine?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { userBookings, fetchUserBookings, cancelBooking } = useBooking();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [cancellingBooking, setCancellingBooking] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadBookings();
  }, [user, navigate]);

  const loadBookings = async () => {
    setLoading(true);
    await fetchUserBookings();
    setLoading(false);
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancellingBooking(bookingId);
    const success = await cancelBooking(bookingId);
    
    if (success) {
      await loadBookings();
    } else {
      alert('Failed to cancel booking. Please try again.');
    }
    
    setCancellingBooking(null);
  };

  const getBookingsByStatus = () => {
    if (activeTab === 'upcoming') {
      return userBookings.filter(booking => 
        booking.status === 'confirmed' || booking.status === 'pending'
      );
    } else if (activeTab === 'past') {
      const today = new Date();
      return userBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate < today;
      });
    } else {
      return userBookings.filter(booking => booking.status === 'cancelled');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'cancelled':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return null;
  }

  const filteredBookings = getBookingsByStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-dark-800">My Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary-100">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl shadow-lg">
              <Calendar className="text-primary-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-dark-800">Total Bookings</h3>
              <p className="text-2xl font-bold text-primary-600">{userBookings.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary-100">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-primary-200 to-primary-300 rounded-xl shadow-lg">
              <Star className="text-primary-700" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-dark-800">Confirmed</h3>
              <p className="text-2xl font-bold text-primary-600">
                {userBookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary-100">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-dark-800">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {userBookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl mb-6 border border-primary-100">
        <div className="border-b border-primary-200">
          <nav className="-mb-px flex">
            {['upcoming', 'past', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-primary-600 hover:border-primary-300'
                }`}
              >
                {tab} Bookings
              </button>
            ))}
          </nav>
        </div>

        {/* Booking List */}
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-dark-800 mb-2">
                No {activeTab} bookings
              </h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming reservations." 
                  : `You don't have any ${activeTab} bookings.`}
              </p>
              {activeTab === 'upcoming' && (
                <button
                  onClick={() => navigate('/restaurants')}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Make a Reservation
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-primary-50/50 border border-primary-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-dark-800">
                          {booking.restaurantName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-primary-500" />
                          {formatDate(booking.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-primary-500" />
                          {booking.time}
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-primary-500" />
                          {booking.guests} guests
                        </div>
                        <div className="flex items-center font-semibold text-gray-900">
                          ${booking.totalAmount}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                      <button
                        onClick={() => navigate(`/restaurant/${booking.restaurantId}`)}
                        className="flex items-center px-4 py-2 text-primary-600 border border-primary-600 rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <Eye size={16} className="mr-2" />
                        View Restaurant
                      </button>
                      
                      {(booking.status === 'confirmed' || booking.status === 'pending') && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancellingBooking === booking.id}
                          className="flex items-center px-4 py-2 text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancellingBooking === booking.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                          ) : (
                            <X size={16} className="mr-2" />
                          )}
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;