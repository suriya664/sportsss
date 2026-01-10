import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = register(formData.name, formData.email, formData.password);

    if (result.success) {
      navigate('/account');
    } else {
      setError(result.error || 'Registration failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-mountain-gray py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Register Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="bg-white glossy-card p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest-green mb-2">
              CREATE ACCOUNT
            </h1>
            <p className="font-lato text-earth-brown text-sm sm:text-base">
              Join SPORTSEQUIP today
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-md font-lato text-xs sm:text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />

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
              placeholder="At least 6 characters"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 mr-2 border-mountain-gray flex-shrink-0"
                required
              />
              <label className="font-lato text-xs sm:text-sm text-earth-brown">
                I agree to the{' '}
                <Link to="/terms" className="text-sunset-orange hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-sunset-orange hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-lato text-earth-brown text-sm sm:text-base">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-sunset-orange hover:underline font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
          </motion.div>

          {/* Why Join Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <div className="bg-sunset-orange text-white p-8 rounded-lg">
              <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl mb-6">
                WHY JOIN <span className="text-white">SPORTSEQUIP</span>?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">🚀</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-lg mb-2">Free & Easy</h3>
                    <p className="font-lato text-orange-100 text-sm sm:text-base">
                      Creating an account is completely free and takes less than a minute. No credit card required.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">💰</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-lg mb-2">Save Money</h3>
                    <p className="font-lato text-orange-100 text-sm sm:text-base">
                      Get exclusive member discounts, early access to sales, and special promotional offers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">📦</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-lg mb-2">Track Orders</h3>
                    <p className="font-lato text-orange-100 text-sm sm:text-base">
                      Easily track your orders, view order history, and manage your shipping addresses all in one place.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">⭐</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-lg mb-2">Rewards Program</h3>
                    <p className="font-lato text-orange-100 text-sm sm:text-base">
                      Earn points with every purchase and redeem them for discounts on future orders.
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

export default Register;
