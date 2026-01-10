import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen bg-mountain-gray py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-2">
                MY <span className="text-sunset-orange">WISHLIST</span>
              </h1>
              {user ? (
                <p className="font-lato text-earth-brown text-sm sm:text-base">
                  Welcome back, {user.name}!
                </p>
              ) : (
                <p className="font-lato text-earth-brown text-sm sm:text-base">
                  Sign in to save your wishlist across devices
                </p>
              )}
            </div>
            {wishlist.length > 0 && (
              <Button
                variant="outline"
                size="md"
                onClick={clearWishlist}
                className="border-sunset-orange text-sunset-orange hover:bg-sunset-orange hover:text-white"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 sm:py-24"
          >
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 sm:h-32 sm:w-32 mx-auto text-mountain-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-forest-green mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="font-lato text-earth-brown mb-8 max-w-md mx-auto">
              Start adding products you love to your wishlist! Click the heart icon on any product to save it for later.
            </p>
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-lato text-earth-brown text-sm sm:text-base">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
              <div className="flex gap-3">
                <Link to="/shop">
                  <Button variant="outline" size="sm">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {wishlist.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <ProductCard product={product} />
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Tips & Benefits Section */}
            <div className="bg-white glossy-card p-6 sm:p-8 mb-8">
              <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4">
                WISHLIST <span className="text-sunset-orange">TIPS</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-3 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    Why Use a Wishlist?
                  </h3>
                  <ul className="space-y-2 font-lato text-sm sm:text-base text-earth-brown">
                    <li className="flex items-start">
                      <span className="text-sunset-orange mr-2">•</span>
                      <span>Save products you're interested in for later</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sunset-orange mr-2">•</span>
                      <span>Get notified when prices drop or items come back in stock</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sunset-orange mr-2">•</span>
                      <span>Share your wishlist with friends and family</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sunset-orange mr-2">•</span>
                      <span>Organize products by category or priority</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-3 flex items-center">
                    <span className="text-2xl mr-2">🎯</span>
                    Shopping Tips
                  </h3>
                  <ul className="space-y-2 font-lato text-sm sm:text-base text-earth-brown">
                    <li className="flex items-start">
                      <span className="text-sunset-orange mr-2">•</span>
                      <span>Compare products side by side before purchasing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sunset-orange mr-2">•</span>
                      <span>Wait for sales and special promotions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sunset-orange mr-2">•</span>
                      <span>Read customer reviews before making a decision</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sunset-orange mr-2">•</span>
                      <span>Check product specifications and compatibility</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-forest-green text-white p-6 rounded-lg text-center">
                <div className="text-3xl mb-2">📧</div>
                <h3 className="font-nunito font-extrabold text-base mb-2">Price Alerts</h3>
                <p className="font-lato text-sm text-green-100">Get notified when prices drop</p>
              </div>
              <div className="bg-sunset-orange text-white p-6 rounded-lg text-center">
                <div className="text-3xl mb-2">🎁</div>
                <h3 className="font-nunito font-extrabold text-base mb-2">Share Wishlist</h3>
                <p className="font-lato text-sm">Share with friends and family</p>
              </div>
              <div className="bg-mountain-gray p-6 rounded-lg text-center">
                <div className="text-3xl mb-2">🛒</div>
                <h3 className="font-nunito font-extrabold text-base mb-2 text-forest-green">Quick Add</h3>
                <p className="font-lato text-sm text-earth-brown">Add all items to cart at once</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

