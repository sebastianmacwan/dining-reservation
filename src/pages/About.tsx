import React from 'react';
import { ChefHat, Handshake, Heart, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-inter bg-gradient-to-br from-gray-50 via-white to-primary-50/30 text-gray-800 pt-20">
      {/* Hero Section with Parallax Effect and Overlay */}
      <div 
        className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center p-4 bg-fixed bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550968940-27e1f44e1c25?q=80&w=2940&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-dark-800 opacity-80"></div>
        <div className="text-center relative z-10 text-white max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
            Connecting You with Culinary Delights
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl font-light drop-shadow-md animate-fade-in-up delay-200">
            Discover and reserve your next perfect dining experience with ease, and let us handle the rest.
          </p>
        </div>
      </div>

      {/* Mission Section with a subtle background */}
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark-800 leading-tight">
            Our Mission: A Story for Every Meal
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            At Dining App, we believe every meal is an opportunity for a new memory. Our mission is to seamlessly connect diners with exceptional restaurants, making the discovery and reservation process a joy. We strive to create moments that last, one reservation at a time.
          </p>
        </div>
      </div>

      {/* Values Section with enhanced cards and hover effects */}
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-primary-50/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark-800 text-center mb-4 leading-tight">
            Why Choose Us?
          </h2>
          <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12">
            We are driven by values that ensure a perfect dining experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Value Card: Quality */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-primary-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Star className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-dark-800">Quality</h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">A hand-picked selection of top-rated restaurants, ensuring a memorable meal.</p>
            </div>
            {/* Value Card: Reliability */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-primary-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Handshake className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-dark-800">Reliability</h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">Instant confirmations and secure bookings every single time.</p>
            </div>
            {/* Value Card: Partnership */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-primary-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-300 to-primary-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <ChefHat className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-dark-800">Partnership</h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">We work with chefs to offer exclusive tables and experiences just for you.</p>
            </div>
            {/* Value Card: Passion */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-primary-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-dark-800">Passion</h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">Our team is genuinely passionate about food, hospitality, and your satisfaction.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section with enhanced gradient and button */}
      <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-700 via-primary-600 to-dark-700 text-white text-center shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto">
          <h2 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Ready to Find Your Next Favorite Spot?
          </h2>
          <p className="relative mt-4 text-lg sm:text-xl md:text-2xl font-light">
            Start your culinary journey with us today.
          </p>
          <button onClick={() => handleNavClick('/')} className="relative mt-8 sm:mt-10 inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 border border-transparent text-base sm:text-lg font-bold rounded-2xl shadow-2xl text-primary-700 bg-white hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
            Get Started
            <ArrowRight className="ml-3" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
