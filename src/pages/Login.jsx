import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChefHat, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <ChefHat className="text-white" size={28} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600 mb-8">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
              Sign up here
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                  Forgot password?
                </Link>
              </div>
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
                  Sign In
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                New to DineBook?{' '}
                <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                  Create your account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;