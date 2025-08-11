import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, Clock, Users, ChefHat, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);

  useEffect(() => {
    fetchFeaturedRestaurants();
  }, []);

  const fetchFeaturedRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants?featured=true&limit=6');
      if (response.ok) {
        const restaurants = await response.json();
        const normalizedRestaurants = restaurants.map((r) => ({
          id: r._id,
          name: r.name,
          cuisine: r.cuisine,
          rating: r.rating,
          priceRange: r.priceRange,
          image: r.image,
          address: r.address,
        }));
        setFeaturedRestaurants(normalizedRestaurants);
      }
    } catch (error) {
      console.error('Failed to fetch featured restaurants:', error);
      setFeaturedRestaurants([
        {
          id: '1',
          name: 'The Golden Spoon',
          cuisine: 'Fine Dining',
          rating: 4.8,
          priceRange: '$$$',
          image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
          address: '123 Gourmet Ave'
        },
        {
          id: '2',
          name: 'Bella Vista',
          cuisine: 'Italian',
          rating: 4.6,
          priceRange: '$$',
          image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
          address: '456 Roma Street'
        },
        {
          id: '3',
          name: 'Sakura Garden',
          cuisine: 'Japanese',
          rating: 4.7,
          priceRange: '$$$',
          image: 'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress&cs=tinysrgb&w=800',
          address: '789 Tokyo Lane'
        }
      ]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="relative bg-cover bg-center bg-fixed min-h-[90vh] flex items-center"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.8) 100%), url("https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1600")'
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center space-y-8 lg:space-y-12">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                  <span className="block">Discover Your</span>
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Perfect Dining
                  </span>
                  <span className="block">Experience</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto text-gray-100 leading-relaxed">
                  Book tables at the finest restaurants in your city. From intimate dinners to grand celebrations, 
                  find your ideal culinary destination with just a few clicks.
                </p>
              </div>

              {/* Enhanced Search Bar */}
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                  <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
                    <div className="flex-1 relative">
                      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                      <input
                        type="text"
                        placeholder="Search restaurants, cuisines, or locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-16 pr-6 py-4 sm:py-5 text-gray-900 text-lg bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-gray-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 sm:py-5 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <Search size={20} />
                      <span className="hidden sm:inline">Search</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto pt-8">
                {[
                  { number: '500+', label: 'Restaurants' },
                  { number: '50K+', label: 'Happy Customers' },
                  { number: '100K+', label: 'Bookings Made' },
                  { number: '4.9★', label: 'Average Rating' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-sm sm:text-base text-gray-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Why Choose <span className="text-primary-600">DineBook</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience seamless dining reservations with our comprehensive booking platform designed for food lovers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: Calendar,
                title: 'Easy Booking',
                description: 'Book your table in just a few clicks. Choose your preferred time, date, and party size with our intuitive interface.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: ChefHat,
                title: 'Curated Restaurants',
                description: 'Discover handpicked restaurants with verified reviews, detailed menus, and authentic dining experiences.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Clock,
                title: 'Real-time Availability',
                description: 'See live availability and book instantly. No waiting, no uncertainty, just seamless reservations.',
                color: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl" 
                     style={{backgroundImage: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`}}></div>
                <div className="relative bg-white p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 lg:mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Featured <span className="text-primary-600">Restaurants</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                Discover the most popular dining destinations, carefully selected for exceptional experiences
              </p>
            </div>
            <Link
              to="/restaurants"
              className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              View All Restaurants
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-64 lg:h-72 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-bold text-gray-900 shadow-lg">
                    {restaurant.priceRange}
                  </div>
                  <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                </div>
                
                <div className="p-6 lg:p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="text-sm font-bold text-gray-900">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                        {restaurant.cuisine}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <TrendingUp size={14} className="mr-1" />
                        Popular
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-primary-500 flex-shrink-0" />
                      <span className="text-sm truncate">{restaurant.address}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/restaurant/${restaurant.id}`}
                    className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-center py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View Details & Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 lg:space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Dine</span>?
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Join thousands of satisfied diners who trust DineBook for their restaurant reservations. 
                Start your culinary journey today.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
              <Link
                to="/restaurants"
                className="group w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              >
                <Search size={20} />
                Find Restaurants
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {!user && (
                <Link
                  to="/signup"
                  className="group w-full sm:w-auto border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <Users size={20} />
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;