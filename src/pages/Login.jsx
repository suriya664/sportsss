import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(formData.email, formData.password);

    if (result.success) {
      navigate('/account');
    } else {
      setError(result.error || 'Login failed');
    }

    setLoading(false);
  };

  const handleQuickLogin = (email, password) => {
    setFormData({ email, password });
    const result = login(email, password);
    if (result.success) {
      navigate('/account');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-mountain-gray py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="bg-white glossy-card p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest-green mb-2">
              WELCOME BACK
            </h1>
            <p className="font-lato text-earth-brown text-sm sm:text-base">
              Sign in to your account
            </p>
          </div>

          {/* Quick Login Buttons */}
          <div className="mb-6 space-y-3">
            <p className="font-lato text-sm text-earth-brown text-center mb-3 font-semibold">
              Quick Login:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs sm:text-sm"
                onClick={() => handleQuickLogin('user@example.com', 'user123')}
              >
                Login as User
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full text-xs sm:text-sm"
                onClick={() => handleQuickLogin('admin@sportsequip.com', 'admin123')}
              >
                Login as Admin
              </Button>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-mountain-gray"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white font-lato text-earth-brown">Or continue with</span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-md font-lato text-xs sm:text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 border-mountain-gray"
                />
                <span className="font-lato text-xs sm:text-sm text-earth-brown">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="font-lato text-xs sm:text-sm text-sunset-orange hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-lato text-earth-brown text-sm sm:text-base">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-sunset-orange hover:underline font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <div className="bg-forest-green text-white p-8 rounded-lg">
              <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl mb-6">
                MEMBER <span className="text-sunset-orange">BENEFITS</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">🎯</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-lg mb-2">Personalized Experience</h3>
                    <p className="font-lato text-green-100 text-sm sm:text-base">
                      Access your order history, saved addresses, and personalized product recommendations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">❤️</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-lg mb-2">Wishlist & Favorites</h3>
                    <p className="font-lato text-green-100 text-sm sm:text-base">
                      Save your favorite products to your wishlist and access them from any device.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">⚡</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-lg mb-2">Faster Checkout</h3>
                    <p className="font-lato text-green-100 text-sm sm:text-base">
                      Save your payment and shipping information for quicker checkout on future orders.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">🎁</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-lg mb-2">Exclusive Offers</h3>
                    <p className="font-lato text-green-100 text-sm sm:text-base">
                      Get access to member-only discounts, early access to sales, and special promotions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
