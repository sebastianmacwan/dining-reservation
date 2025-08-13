import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, Clock, Users, ChefHat, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext is in this path

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
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-400/20 rounded-full blur-3xl"></div>
        </div>
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1600")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-800/80"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
                Discover Your Perfect
                <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Dining Experience</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 animate-slide-up">
                Book tables at the finest restaurants in your city. From intimate dinners to celebrations, find your ideal spot.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto animate-slide-up">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search restaurants, cuisines, or locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/95 backdrop-blur-sm border border-white/20 shadow-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-dark-800 mb-2">500+</div>
              <div className="text-gray-600 text-sm md:text-base">Partner Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-dark-800 mb-2">50K+</div>
              <div className="text-gray-600 text-sm md:text-base">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-dark-800 mb-2">100K+</div>
              <div className="text-gray-600 text-sm md:text-base">Reservations Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-dark-800 mb-2">4.9★</div>
              <div className="text-gray-600 text-sm md:text-base">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-gradient-to-br from-gray-50 to-primary-50/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-800">Why Choose DineBook?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience seamless dining reservations with our comprehensive booking platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Calendar className="text-primary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-dark-800 mb-3">Easy Booking</h3>
            <p className="text-gray-600">
              Book your table in just a few clicks. Choose your preferred time, date, and party size.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ChefHat className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-dark-800 mb-3">Curated Restaurants</h3>
            <p className="text-gray-600">
              Discover handpicked restaurants with verified reviews and detailed information.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-dark-600 to-dark-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Clock className="text-primary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-dark-800 mb-3">Real-time Availability</h3>
            <p className="text-gray-600">
              See live availability and book instantly. No waiting, no uncertainty.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-dark-800">Featured Restaurants</h2>
            <p className="text-gray-600 mt-2">Discover the most popular dining destinations</p>
          </div>
          <Link
            to="/restaurants"
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {restaurant.priceRange}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-dark-800">{restaurant.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-medium text-gray-600">{restaurant.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin size={14} className="mr-1" />
                  {restaurant.address}
                </div>

                <Link
                  to={`/restaurant/${restaurant.id}`}
                  className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View Details & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-dark-900 to-dark-800 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simple steps to your perfect dining experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse & Search</h3>
              <p className="text-gray-300">
                Explore our curated selection of restaurants and find the perfect match for your taste and occasion.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Your Table</h3>
              <p className="text-gray-300">
                Select your preferred date, time, and party size. Get instant confirmation for your reservation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Enjoy Your Meal</h3>
              <p className="text-gray-300">
                Arrive at the restaurant and enjoy your dining experience. Rate and review to help others.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-accent-600/90"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Dine?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of satisfied diners who trust DineBook for their restaurant reservations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/restaurants"
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Search className="mr-2" size={20} />
                Find Restaurants
              </Link>
              {!user && (
                <Link
                  to="/signup"
                  className="border-2 border-white/50 hover:bg-white hover:text-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm"
                >
                  <Users className="mr-2" size={20} />
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
