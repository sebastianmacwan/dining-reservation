import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, Calendar, LogOut, Settings, ChefHat } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <ChefHat className="text-white" size={20} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl lg:text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  DineBook
                </span>
                <div className="text-xs text-gray-500 -mt-1">Premium Dining</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/restaurants', label: 'Restaurants' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></div>
                )}
              </Link>
            ))}
            
            {user && (
              <Link
                to="/dashboard"
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  isActive('/dashboard')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                My Bookings
                {isActive('/dashboard') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></div>
                )}
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-all duration-300 p-2 rounded-xl hover:bg-gray-50 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                    <User size={18} className="text-primary-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-2 z-20 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                      
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Calendar size={18} className="mr-3 text-primary-500" />
                        My Bookings
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings size={18} className="mr-3 text-primary-500" />
                          Admin Panel
                        </Link>
                      )}
                      
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={18} className="mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-50"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 top-3 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-200/50">
            {[
              { path: '/', label: 'Home' },
              { path: '/restaurants', label: 'Restaurants' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive('/dashboard')
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
                
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all duration-300 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="px-4 py-2">
                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-300 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <Link
                  to="/login"
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all duration-300 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block mx-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-sm font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;