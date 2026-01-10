import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-mountain-gray flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="font-nunito font-extrabold text-6xl sm:text-7xl md:text-8xl text-sunset-orange">
              404
            </h1>
          </motion.div>

          <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mb-4">
            PAGE NOT <span className="text-sunset-orange">FOUND</span>
          </h2>
          <p className="font-lato text-base sm:text-lg text-earth-brown mb-6 sm:mb-8">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/">
              <Button variant="primary" size="lg">
                Go Home
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" size="lg">
                Browse Shop
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-white glossy-card p-6 sm:p-8 mt-8 text-left">
            <h3 className="font-nunito font-extrabold text-xl text-forest-green mb-4 text-center">
              POPULAR <span className="text-sunset-orange">PAGES</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/shop" className="flex items-center p-3 rounded-lg hover:bg-mountain-gray transition-colors">
                <span className="text-2xl mr-3">🛍️</span>
                <div>
                  <p className="font-nunito font-extrabold text-sm text-forest-green">Shop All Products</p>
                  <p className="font-lato text-xs text-earth-brown">Browse our complete catalog</p>
                </div>
              </Link>
              <Link to="/about" className="flex items-center p-3 rounded-lg hover:bg-mountain-gray transition-colors">
                <span className="text-2xl mr-3">ℹ️</span>
                <div>
                  <p className="font-nunito font-extrabold text-sm text-forest-green">About Us</p>
                  <p className="font-lato text-xs text-earth-brown">Learn more about SPORTSEQUIP</p>
                </div>
              </Link>
              <Link to="/contact" className="flex items-center p-3 rounded-lg hover:bg-mountain-gray transition-colors">
                <span className="text-2xl mr-3">📧</span>
                <div>
                  <p className="font-nunito font-extrabold text-sm text-forest-green">Contact Us</p>
                  <p className="font-lato text-xs text-earth-brown">Get in touch with our team</p>
                </div>
              </Link>
              <Link to="/account" className="flex items-center p-3 rounded-lg hover:bg-mountain-gray transition-colors">
                <span className="text-2xl mr-3">👤</span>
                <div>
                  <p className="font-nunito font-extrabold text-sm text-forest-green">My Account</p>
                  <p className="font-lato text-xs text-earth-brown">Manage your account</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-6 bg-mountain-gray p-6 rounded-lg">
            <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-3 text-center">
              Can't Find What You're Looking For?
            </h3>
            <p className="font-lato text-sm sm:text-base text-earth-brown text-center mb-4">
              Try searching for products or browse our categories
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop">
                <Button variant="primary" size="md">
                  Search Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
