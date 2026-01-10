import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-mountain-gray flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-sunset-orange rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </motion.div>

          <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-4">
            ORDER <span className="text-sunset-orange">CONFIRMED</span>
          </h1>
          <p className="font-lato text-lg sm:text-xl text-earth-brown mb-8">
            Thank you for your purchase! Your order has been successfully placed.
          </p>
          <p className="font-lato text-base sm:text-lg text-earth-brown mb-8">
            You will receive an email confirmation shortly with your order details
            and tracking information.
          </p>

          {/* Order Details Card */}
          <div className="bg-white glossy-card p-6 sm:p-8 mb-8 text-left">
            <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4">
              WHAT'S <span className="text-sunset-orange">NEXT</span>?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-sunset-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-nunito font-extrabold mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="font-nunito font-extrabold text-base sm:text-lg text-forest-green mb-1">Order Confirmation</h3>
                  <p className="font-lato text-sm sm:text-base text-earth-brown">Check your email for order confirmation and invoice within the next few minutes.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-sunset-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-nunito font-extrabold mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="font-nunito font-extrabold text-base sm:text-lg text-forest-green mb-1">Order Processing</h3>
                  <p className="font-lato text-sm sm:text-base text-earth-brown">We'll prepare your order for shipment within 1-2 business days.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-sunset-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-nunito font-extrabold mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="font-nunito font-extrabold text-base sm:text-lg text-forest-green mb-1">Shipping & Tracking</h3>
                  <p className="font-lato text-sm sm:text-base text-earth-brown">You'll receive a tracking number via email once your order ships. Delivery typically takes 2-5 business days.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Helpful Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg text-center">
              <div className="text-3xl mb-2">📧</div>
              <h3 className="font-nunito font-extrabold text-sm sm:text-base text-forest-green mb-1">Email Support</h3>
              <p className="font-lato text-xs sm:text-sm text-earth-brown">support@sportsequip.com</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg text-center">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-nunito font-extrabold text-sm sm:text-base text-forest-green mb-1">Phone Support</h3>
              <p className="font-lato text-xs sm:text-sm text-earth-brown">+1 (555) 123-4567</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg text-center">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-nunito font-extrabold text-sm sm:text-base text-forest-green mb-1">Live Chat</h3>
              <p className="font-lato text-xs sm:text-sm text-earth-brown">Available 24/7</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="outline" size="lg">
                View Orders
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
