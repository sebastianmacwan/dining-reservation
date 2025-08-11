import React from 'react';
import { ChefHat, Handshake, Heart, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="font-inter bg-gray-50 text-gray-800">
      {/* Hero Section with Parallax Effect and Overlay */}
      <div 
        className="relative h-[70vh] flex items-center justify-center p-4 bg-fixed bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550968940-27e1f44e1c25?q=80&w=2940&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-800 opacity-80"></div>
        <div className="text-center relative z-10 text-white max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
            Connecting You with Culinary Delights
          </h1>
          <p className="mt-6 text-lg md:text-xl lg:text-2xl font-light drop-shadow-md animate-fade-in-up delay-200">
            Discover and reserve your next perfect dining experience with ease, and let us handle the rest.
          </p>
        </div>
      </div>

      {/* Mission Section with a subtle background */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Our Mission: A Story for Every Meal
          </h2>
          <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed">
            At Dining App, we believe every meal is an opportunity for a new memory. Our mission is to seamlessly connect diners with exceptional restaurants, making the discovery and reservation process a joy. We strive to create moments that last, one reservation at a time.
          </p>
        </div>
      </div>

      {/* Values Section with enhanced cards and hover effects */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-4 leading-tight">
            Why Choose Us?
          </h2>
          <p className="text-center text-base md:text-lg text-gray-600 mb-12">
            We are driven by values that ensure a perfect dining experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value Card: Quality */}
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out">
              <Star className="text-indigo-600 mb-4 transform scale-125" size={48} />
              <h3 className="text-xl font-bold text-gray-900">Quality</h3>
              <p className="mt-2 text-gray-600">A hand-picked selection of top-rated restaurants, ensuring a memorable meal.</p>
            </div>
            {/* Value Card: Reliability */}
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out">
              <Handshake className="text-indigo-600 mb-4 transform scale-125" size={48} />
              <h3 className="text-xl font-bold text-gray-900">Reliability</h3>
              <p className="mt-2 text-gray-600">Instant confirmations and secure bookings every single time.</p>
            </div>
            {/* Value Card: Partnership */}
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out">
              <ChefHat className="text-indigo-600 mb-4 transform scale-125" size={48} />
              <h3 className="text-xl font-bold text-gray-900">Partnership</h3>
              <p className="mt-2 text-gray-600">We work with chefs to offer exclusive tables and experiences just for you.</p>
            </div>
            {/* Value Card: Passion */}
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out">
              <Heart className="text-indigo-600 mb-4 transform scale-125" size={48} />
              <h3 className="text-xl font-bold text-gray-900">Passion</h3>
              <p className="mt-2 text-gray-600">Our team is genuinely passionate about food, hospitality, and your satisfaction.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section with enhanced gradient and button */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-700 to-purple-700 text-white text-center shadow-inner">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Ready to Find Your Next Favorite Spot?
          </h2>
          <p className="mt-4 text-xl md:text-2xl font-light">
            Start your culinary journey with us today.
          </p>
          <Link to="/" className="mt-10 inline-flex items-center px-10 py-5 border border-transparent text-lg font-bold rounded-full shadow-lg text-indigo-700 bg-white hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                         Get Started
            <ArrowRight className="ml-3" size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
