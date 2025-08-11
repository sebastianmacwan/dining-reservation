import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ChefHat, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const success = await signup(name, email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Failed to create account. Please try again.');
    }
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 12) return { strength: 75, label: 'Good', color: 'bg-blue-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <ChefHat className="text-white" size={28} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600 mb-8">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                  Full name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                  Email address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Password strength</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength.strength >= 75 ? 'text-green-600' : 
                        passwordStrength.strength >= 50 ? 'text-blue-600' : 
                        passwordStrength.strength >= 25 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-3">
                  Confirm password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {confirmPassword && (
                  <div className="mt-2 flex items-center">
                    {password === confirmPassword ? (
                      <div className="flex items-center text-green-600">
                        <Check size={16} className="mr-2" />
                        <span className="text-sm">Passwords match</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <X size={16} className="mr-2" />
                        <span className="text-sm">Passwords don't match</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors mt-1"
              />
              <label htmlFor="agree-terms" className="ml-3 block text-sm text-gray-700 leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500 font-medium transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500 font-medium transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;