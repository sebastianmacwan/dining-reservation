import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, TrendingUp, Clock, CheckCircle, X, Eye } from 'lucide-react';

interface Booking {
  id: string;
  userId: string;
  userName: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
}

interface RestaurantStats {
  id: string;
  name: string;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeRestaurants: 0,
    pendingBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Mock data for demo - in real app, fetch from API
      const mockBookings: Booking[] = [
        {
          id: '1',
          userId: 'u1',
          userName: 'John Doe',
          restaurantId: '1',
          restaurantName: 'The Golden Spoon',
          date: '2024-01-20',
          time: '7:00 PM',
          guests: 4,
          status: 'pending',
          totalAmount: 100
        },
        {
          id: '2',
          userId: 'u2',
          userName: 'Sarah Johnson',
          restaurantId: '2',
          restaurantName: 'Bella Vista',
          date: '2024-01-21',
          time: '6:30 PM',
          guests: 2,
          status: 'confirmed',
          totalAmount: 50
        },
        {
          id: '3',
          userId: 'u3',
          userName: 'Mike Chen',
          restaurantId: '3',
          restaurantName: 'Sakura Garden',
          date: '2024-01-19',
          time: '8:00 PM',
          guests: 6,
          status: 'confirmed',
          totalAmount: 150
        }
      ];

      setBookings(mockBookings);
      setStats({
        totalBookings: mockBookings.length,
        totalRevenue: mockBookings.reduce((sum, booking) => sum + booking.totalAmount, 0),
        activeRestaurants: 12,
        pendingBookings: mockBookings.filter(b => b.status === 'pending').length
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
    try {
      // Mock API call
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status }
            : booking
        )
      );
      
      // Update stats
      if (status === 'confirmed') {
        setStats(prev => ({
          ...prev,
          pendingBookings: prev.pendingBookings - 1
        }));
      }
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
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

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage bookings and monitor restaurant performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="text-purple-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Restaurants</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.activeRestaurants}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Bookings</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {['overview', 'bookings', 'restaurants'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{booking.userName}</p>
                          <p className="text-sm text-gray-600">{booking.restaurantName}</p>
                          <p className="text-xs text-gray-500">{formatDate(booking.date)} at {booking.time}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Users className="text-primary-500 mr-3" size={20} />
                        <div>
                          <h4 className="font-medium text-gray-900">Manage Restaurants</h4>
                          <p className="text-sm text-gray-600">Add, edit, or remove restaurant listings</p>
                        </div>
                      </div>
                    </button>
                    
                    <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <TrendingUp className="text-primary-500 mr-3" size={20} />
                        <div>
                          <h4 className="font-medium text-gray-900">View Analytics</h4>
                          <p className="text-sm text-gray-600">Monitor performance and trends</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>All Restaurants</option>
                    <option>The Golden Spoon</option>
                    <option>Bella Vista</option>
                    <option>Sakura Garden</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4 lg:mb-0">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{booking.userName}</h4>
                              <p className="text-gray-600">{booking.restaurantName}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 lg:mt-2">
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
                              <DollarSign size={16} className="mr-1" />
                              {booking.totalAmount}
                            </div>
                          </div>
                        </div>
                        
                        {booking.status === 'pending' && (
                          <div className="flex space-x-3 mt-4 lg:mt-0">
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            >
                              <CheckCircle size={16} className="mr-2" />
                              Confirm
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                              <X size={16} className="mr-2" />
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'restaurants' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Restaurant Management</h3>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Add Restaurant
                </button>
              </div>
              
              <div className="text-center py-12 text-gray-500">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>Restaurant management features coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;