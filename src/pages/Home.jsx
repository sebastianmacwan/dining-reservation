// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, Star, MapPin, Clock, Users, ChefHat, Calendar } from 'lucide-react';

// interface Restaurant {
//   id: string;
//   name: string;
//   cuisine: string;
//   rating: number;
//   priceRange: string;
//   image: string;
//   address: string;
// }

// const Home: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);

//   useEffect(() => {
//     fetchFeaturedRestaurants();
//   }, []);

//   const fetchFeaturedRestaurants = async () => {
//     try {
//       const response = await fetch('/api/restaurants?featured=true&limit=6');
//       if (response.ok) {
//      const restaurants = await response.json();
// const normalizedRestaurants = restaurants.map((r: any) => ({
//   id: r._id, // ✅ normalize _id to id
//   name: r.name,
//   cuisine: r.cuisine,
//   rating: r.rating,
//   priceRange: r.priceRange,
//   image: r.image,
//   address: r.address,
// }));

// setFeaturedRestaurants(normalizedRestaurants);

//       }
//     } catch (error) {
//       console.error('Failed to fetch featured restaurants:', error);
//       // Set mock data for demo
//       setFeaturedRestaurants([
//         {
//           id: '1',
//           name: 'The Golden Spoon',
//           cuisine: 'Fine Dining',
//           rating: 4.8,
//           priceRange: '$$$',
//           image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
//           address: '123 Gourmet Ave'
//         },
//         {
//           id: '2',
//           name: 'Bella Vista',
//           cuisine: 'Italian',
//           rating: 4.6,
//           priceRange: '$$',
//           image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
//           address: '456 Roma Street'
//         },
//         {
//           id: '3',
//           name: 'Sakura Garden',
//           cuisine: 'Japanese',
//           rating: 4.7,
//           priceRange: '$$$',
//           image: 'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress&cs=tinysrgb&w=800',
//           address: '789 Tokyo Lane'
//         }
//       ]);
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       window.location.href = `/restaurants?search=${encodeURIComponent(searchQuery)}`;
//     }
//   };

//   return (
//     <div className="space-y-16 pb-16">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white">
//         <div className="absolute inset-0 bg-black opacity-20"></div>
//         <div 
//           className="relative bg-cover bg-center"
//           style={{
//             backgroundImage: 'url("https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1600")'
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
//           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
//             <div className="text-center space-y-8">
//               <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
//                 Discover Your Perfect
//                 <span className="block text-primary-300">Dining Experience</span>
//               </h1>
//               <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 animate-slide-up">
//                 Book tables at the finest restaurants in your city. From intimate dinners to celebrations, find your ideal spot.
//               </p>
              
//               {/* Search Bar */}
//               <div className="max-w-2xl mx-auto animate-slide-up">
//                 <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
//                   <div className="flex-1 relative">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                       type="text"
//                       placeholder="Search restaurants, cuisines, or locations..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
//                   >
//                     Search
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center space-y-4 mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose DineBook?</h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Experience seamless dining reservations with our comprehensive booking platform
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
//             <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Calendar className="text-primary-600" size={32} />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
//             <p className="text-gray-600">
//               Book your table in just a few clicks. Choose your preferred time, date, and party size.
//             </p>
//           </div>

//           <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
//             <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <ChefHat className="text-secondary-600" size={32} />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Restaurants</h3>
//             <p className="text-gray-600">
//               Discover handpicked restaurants with verified reviews and detailed information.
//             </p>
//           </div>

//           <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
//             <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Clock className="text-primary-600" size={32} />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Availability</h3>
//             <p className="text-gray-600">
//               See live availability and book instantly. No waiting, no uncertainty.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Featured Restaurants */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900">Featured Restaurants</h2>
//             <p className="text-gray-600 mt-2">Discover the most popular dining destinations</p>
//           </div>
//           <Link
//             to="/restaurants"
//             className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             View All
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {featuredRestaurants.map((restaurant) => (
//             <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={restaurant.image}
//                   alt={restaurant.name}
//                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                 />
//                 <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
//                   {restaurant.priceRange}
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
//                   <div className="flex items-center space-x-1">
//                     <Star className="text-yellow-400 fill-current" size={16} />
//                     <span className="text-sm font-medium text-gray-600">{restaurant.rating}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
//                 <div className="flex items-center text-gray-500 text-sm mb-4">
//                   <MapPin size={14} className="mr-1" />
//                   {restaurant.address}
//                 </div>
                
//                 <Link
//                   to={`/restaurant/${restaurant.id}`}
//                   className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
//                 >
//                   View Details & Book
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-gray-900 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center space-y-8">
//             <h2 className="text-3xl md:text-4xl font-bold">Ready to Dine?</h2>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               Join thousands of satisfied diners who trust DineBook for their restaurant reservations.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/restaurants"
//                 className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
//               >
//                 <Search className="mr-2" size={20} />
//                 Find Restaurants
//               </Link>
//               <Link
//                 to="/signup"
//                 className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center justify-center"
//               >
//                 <Users className="mr-2" size={20} />
//                 Create Account
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, Clock, Users, ChefHat, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext is in this path

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  image: string;
  address: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate(); // Added useNavigate
  const { user } = useAuth(); // Using the useAuth hook to check for the user
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetchFeaturedRestaurants();
  }, []);

  const fetchFeaturedRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants?featured=true&limit=6');
      if (response.ok) {
        const restaurants = await response.json();
        const normalizedRestaurants = restaurants.map((r: any) => ({
          id: r._id, // ✅ normalize _id to id
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
      // Set mock data for demo
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`); // Updated to use navigate
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1600")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
                Discover Your Perfect
                <span className="block text-primary-300">Dining Experience</span>
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
                      className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose DineBook?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience seamless dining reservations with our comprehensive booking platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-primary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Book your table in just a few clicks. Choose your preferred time, date, and party size.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="text-secondary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Restaurants</h3>
            <p className="text-gray-600">
              Discover handpicked restaurants with verified reviews and detailed information.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-primary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Availability</h3>
            <p className="text-gray-600">
              See live availability and book instantly. No waiting, no uncertainty.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Restaurants</h2>
            <p className="text-gray-600 mt-2">Discover the most popular dining destinations</p>
          </div>
          <Link
            to="/restaurants"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                  {restaurant.priceRange}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
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
                  className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  View Details & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Dine?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied diners who trust DineBook for their restaurant reservations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/restaurants"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                <Search className="mr-2" size={20} />
                Find Restaurants
              </Link>
              {/* This button is only shown if the user is NOT logged in */}
              {!user && (
                <Link
                  to="/signup"
                  className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center justify-center"
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
