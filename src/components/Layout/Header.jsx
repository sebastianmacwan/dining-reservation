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
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location]);

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };
  const handleLogout = () => {
    logout();
    handleNavClick('/');
    setIsUserMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => handleNavClick('/')} className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <ChefHat className="text-white" size={16} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-primary-300 to-accent-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden xs:block">
                <span className="font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-dark-800 to-dark-600 bg-clip-text text-transparent">
                  DineBook
                </span>
                <div className="text-xs sm:text-xs text-primary-600 -mt-1 font-medium">Premium Dining</div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/restaurants', label: 'Restaurants' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-dark-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></div>
                )}
              </button>
            ))}
            
            {user && (
              <button
                onClick={() => handleNavClick('/dashboard')}
                className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  isActive('/dashboard')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-dark-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                My Bookings
                {isActive('/dashboard') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></div>
                )}
              </button>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 lg:space-x-3 text-dark-600 hover:text-primary-600 transition-all duration-300 p-2 rounded-xl hover:bg-primary-50 group"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-300 shadow-md">
                    <User size={16} className="text-primary-600" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-sm font-semibold text-dark-700">{user.name}</div>
                    <div className="text-xs text-primary-600 capitalize font-medium">{user.role}</div>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-48 lg:w-64 bg-white rounded-2xl shadow-2xl py-2 z-20 border border-primary-100">
                      <div className="px-4 py-3 border-b border-primary-100">
                        <div className="font-semibold text-dark-800">{user.name}</div>
                        <div className="text-sm text-primary-600">{user.email}</div>
                      </div>
                      
                      <button
                        onClick={() => handleNavClick('/dashboard')}
                        className="flex items-center w-full px-4 py-3 text-sm text-dark-600 hover:bg-primary-50 transition-colors"
                      >
                        <Calendar size={18} className="mr-3 text-primary-500" />
                        My Bookings
                      </button>
                      
                      {user.role === 'admin' && (
                        <button
                          onClick={() => handleNavClick('/admin')}
                          className="flex items-center w-full px-4 py-3 text-sm text-dark-600 hover:bg-primary-50 transition-colors"
                        >
                          <Settings size={18} className="mr-3 text-primary-500" />
                          Admin Panel
                        </button>
                      )}
                      
                      <div className="border-t border-primary-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg mx-2"
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
              <div className="flex items-center space-x-2 lg:space-x-3">
                <button
                  onClick={() => handleNavClick('/login')}
                  className="text-dark-600 hover:text-primary-600 px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-primary-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('/signup')}
                  className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-4 lg:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-dark-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                <span className={`absolute block w-5 sm:w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></span>
                <span className={`absolute block w-5 sm:w-6 h-0.5 bg-current transform transition-all duration-300 top-2 sm:top-3 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-5 sm:w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-2 sm:top-3' : 'top-4 sm:top-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-primary-200/50 bg-white/95 backdrop-blur-sm">
            {[
              { path: '/', label: 'Home' },
              { path: '/restaurants', label: 'Restaurants' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-dark-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {user ? (
              <>
                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive('/dashboard')
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-dark-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  My Bookings
                </button>
                
                {user.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('/admin')}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-dark-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 rounded-lg"
                  >
                    Admin Panel
                  </button>
                )}
                
                <div className="border-t border-primary-200 mt-4 pt-4">
                  <div className="px-4 py-2">
                    <div className="text-sm font-semibold text-dark-800">{user.name}</div>
                    <div className="text-xs text-primary-600">{user.email}</div>
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
              <div className="space-y-2 border-t border-primary-200 pt-4">
                <button
                  onClick={() => handleNavClick('/login')}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-dark-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('/signup')}
                  className="block w-full mx-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl text-sm font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;