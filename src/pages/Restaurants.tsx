import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, DollarSign, ChefHat } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  image: string;
  address: string;
  description: string;
  openingHours: string;
}

const Restaurants: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    fetchRestaurants();
  }, [searchQuery, selectedCuisine, selectedPriceRange, sortBy]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCuisine) params.append('cuisine', selectedCuisine);
      if (selectedPriceRange) params.append('priceRange', selectedPriceRange);
      if (sortBy) params.append('sort', sortBy);

      const response = await fetch(`/api/restaurants?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        // setRestaurants(data);
        const normalizedData = data.map((r: any) => ({
  ...r,
  id: r._id || r.id, // fall back if already normalized
}));
setRestaurants(normalizedData);

      }
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      // Mock data for demo
      setRestaurants([
        {
          id: '1',
          name: 'The Golden Spoon',
          cuisine: 'Fine Dining',
          rating: 4.8,
          priceRange: '$$$',
          image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
          address: '123 Gourmet Ave',
          description: 'An upscale dining experience featuring contemporary cuisine with seasonal ingredients.',
          openingHours: '5:00 PM - 11:00 PM'
        },
        {
          id: '2',
          name: 'Bella Vista',
          cuisine: 'Italian',
          rating: 4.6,
          priceRange: '$$',
          image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
          address: '456 Roma Street',
          description: 'Authentic Italian cuisine in a cozy, family-friendly atmosphere.',
          openingHours: '11:00 AM - 10:00 PM'
        },
        {
          id: '3',
          name: 'Sakura Garden',
          cuisine: 'Japanese',
          rating: 4.7,
          priceRange: '$$$',
          image: 'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress&cs=tinysrgb&w=800',
          address: '789 Tokyo Lane',
          description: 'Traditional Japanese cuisine with modern presentation and fresh sushi.',
          openingHours: '5:30 PM - 10:30 PM'
        },
        {
          id: '4',
          name: 'Spice Route',
          cuisine: 'Indian',
          rating: 4.5,
          priceRange: '$$',
          image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
          address: '321 Curry Lane',
          description: 'Aromatic Indian spices and flavors in an elegant setting.',
          openingHours: '12:00 PM - 10:00 PM'
        },
        {
          id: '5',
          name: 'Ocean Breeze',
          cuisine: 'Seafood',
          rating: 4.4,
          priceRange: '$$$',
          image: 'https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=800',
          address: '654 Harbor View',
          description: 'Fresh seafood with stunning ocean views and coastal ambiance.',
          openingHours: '4:00 PM - 11:00 PM'
        },
        {
          id: '6',
          name: 'Farm Table',
          cuisine: 'American',
          rating: 4.3,
          priceRange: '$$',
          image: 'https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=800',
          address: '987 Country Road',
          description: 'Farm-to-table dining with locally sourced ingredients.',
          openingHours: '11:00 AM - 9:00 PM'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRestaurants();
  };

  const cuisines = ['Italian', 'Japanese', 'Indian', 'American', 'Seafood', 'Fine Dining'];
  const priceRanges = ['$', '$$', '$$$', '$$$$'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filters */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-primary-100">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
            <ChefHat className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-dark-800">Find Your Perfect Restaurant</h1>
            <p className="text-gray-600 text-sm sm:text-base">Discover amazing dining experiences</p>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-primary-50/50 focus:bg-white shadow-sm text-base sm:text-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-primary-50/50 focus:bg-white shadow-sm text-sm sm:text-base"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>

          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-primary-50/50 focus:bg-white shadow-sm text-sm sm:text-base"
          >
            <option value="">All Prices</option>
            {priceRanges.map((price) => (
              <option key={price} value={price}>{price}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-primary-50/50 focus:bg-white shadow-sm text-sm sm:text-base"
          >
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
            <option value="priceRange">Sort by Price</option>
          </select>

          <button className="flex items-center justify-center border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 shadow-sm text-sm sm:text-base">
            <Filter size={16} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark-800">
          {searchQuery ? `Search results for "${searchQuery}"` : 'All Restaurants'}
        </h2>
        <div className="bg-primary-100 px-3 sm:px-4 py-2 rounded-xl">
          <span className="text-primary-700 font-semibold text-sm sm:text-base">{restaurants.length} restaurants found</span>
        </div>
      </div>

      {/* Restaurant Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse border border-gray-100">
              <div className="h-40 sm:h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4 w-2/3"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 bg-gray-300 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-100">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-dark-800 mb-2">No restaurants found</h3>
          <p className="text-gray-600 text-sm sm:text-base px-4">Try adjusting your search criteria or explore different options.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100">
              <div className="sm:flex">
                <div className="sm:w-1/3">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-40 sm:h-48 md:h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="sm:w-2/3 p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-dark-800">{restaurant.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm font-medium text-gray-600">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">{restaurant.cuisine}</span>
                    <span className="flex items-center">
                      <DollarSign size={14} className="mr-1" />
                      {restaurant.priceRange}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-xs sm:text-sm line-clamp-2">{restaurant.description}</p>
                  
                  <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2 text-primary-500" />
                      {restaurant.address}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2 text-primary-500" />
                      {restaurant.openingHours}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleNavClick(`/restaurant/${restaurant.id}`)}
                    className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-center py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    View Details & Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Restaurants;