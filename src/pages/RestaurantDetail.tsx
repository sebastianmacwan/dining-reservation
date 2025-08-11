import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Globe, Calendar, Users, ChefHat } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

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
  phone: string;
  website: string;
  gallery: string[];
  menu: string[];
  amenities: string[];
  reviews: Array<{
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedRestaurant } = useBooking();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchRestaurant(id);
    }
  }, [id]);

   const fetchRestaurant = async (restaurantId: string) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/restaurants/${restaurantId}`);
    if (!res.ok) throw new Error('Restaurant not found');
    const data = await res.json();

    const parsedMenu = typeof data.menu === 'string' ? JSON.parse(data.menu) : data.menu || [];

    const rawReviews = typeof data.reviews === 'string' ? JSON.parse(data.reviews) : data.reviews || [];

    const parsedReviews = rawReviews.map((review: any, index: number) => {
      if (typeof review === 'string') {
        return {
          id: `${index}`,
          userName: 'Guest',
          rating: 4,
          comment: review,
          date: new Date().toLocaleDateString(),
        };
      }
      return review;
    });

    setRestaurant({
      ...data,
      id: data._id || data.id,
      amenities: data.amenities || [],
      gallery: data.gallery || [],
      menu: parsedMenu,
      reviews: parsedReviews,
    });
  } catch (err) {
    console.error('Failed to fetch restaurant:', err);
  } finally {
    setLoading(false);
  }
};



  const handleBookTable = () => {
    if (restaurant) {
      setSelectedRestaurant({
        id: restaurant.id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        priceRange: restaurant.priceRange,
        image: restaurant.image,
        address: restaurant.address,
        description: restaurant.description
      });
      navigate(`/booking/${restaurant.id}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-64 md:h-96 bg-gray-300 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h1>
          <Link to="/restaurants" className="text-primary-600 hover:text-primary-700">
            Back to restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400 fill-current" size={20} />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{restaurant.cuisine}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{restaurant.priceRange}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'menu', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${activeTab === tab
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {restaurant.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <ChefHat size={16} className="text-primary-500" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {restaurant.gallery.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {restaurant.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${restaurant.name} gallery ${index + 1}`}
                        className="h-32 w-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'menu' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu</h2>
              <div className="space-y-4">
                {restaurant.menu.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">{item}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
              <div className="space-y-6">
                {restaurant.reviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-primary-600">
                            {review.userName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{review.userName}</h4>
                          <p className="text-sm text-gray-600">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Make a Reservation</h3>
            <button
              onClick={handleBookTable}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors mb-4"
            >
              Book a Table
            </button>
            <div className="text-center text-sm text-gray-600">
              <Calendar className="inline mr-1" size={14} />
              Available for advance booking
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-primary-500" />
                <span className="text-gray-700">{restaurant.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-500" />
                <span className="text-gray-700">{restaurant.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe size={16} className="text-primary-500" />
                <a href={`https://${restaurant.website}`} className="text-primary-600 hover:text-primary-700">
                  {restaurant.website}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={16} className="text-primary-500 mt-1" />
                <span className="text-gray-700 text-sm">{restaurant.openingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;