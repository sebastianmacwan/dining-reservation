import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                <ChefHat className="text-white" size={20} />
              </div>
              <div>
                <span className="font-bold text-xl">DineBook</span>
                <div className="text-xs text-primary-400 -mt-1">Premium Dining</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your premier dining reservation platform. Discover exceptional restaurants and book your perfect dining experience.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center hover:bg-primary-500/30 transition-colors cursor-pointer">
                <Facebook size={18} className="text-primary-400 hover:text-primary-300" />
              </div>
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center hover:bg-primary-500/30 transition-colors cursor-pointer">
                <Twitter size={18} className="text-primary-400 hover:text-primary-300" />
              </div>
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center hover:bg-primary-500/30 transition-colors cursor-pointer">
                <Instagram size={18} className="text-primary-400 hover:text-primary-300" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/restaurants" className="text-gray-400 hover:text-primary-400 transition-colors">Restaurants</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-primary-400 transition-colors">My Bookings</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="text-gray-400 hover:text-primary-400 transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-500" />
                <span className="text-gray-400">hello@dinebook.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-primary-500" />
                <span className="text-gray-400">123 Restaurant St, Food City, FC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-primary-800/30 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DineBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;