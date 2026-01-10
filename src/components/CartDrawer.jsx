import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Button from './Button';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-nunito font-extrabold text-2xl text-forest-green">
                  Your Cart ({cart.length})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-titanium-gray hover:text-signal-red transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-lato text-earth-brown mb-4">
                    Your cart is empty
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsCartOpen(false);
                      window.location.href = '/shop';
                    }}
                  >
                    Shop Now
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4 border-b border-titanium-gray pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-nunito font-bold text-sm text-forest-green mb-1">
                            {item.name}
                          </h3>
                          <p className="font-lato text-sm text-sunset-orange mb-2 font-semibold">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center border border-titanium-gray hover:border-signal-red transition-colors"
                            >
                              -
                            </button>
                            <span className="font-inter text-sm w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border border-titanium-gray hover:border-signal-red transition-colors"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-sunset-orange hover:text-orange-600 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-titanium-gray pt-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-nunito font-extrabold text-xl text-forest-green">Total:</span>
                      <span className="font-nunito font-extrabold text-2xl text-sunset-orange">
                        ${getCartTotal().toFixed(2)}
                      </span>
                    </div>
                    <Link to="/cart" onClick={() => setIsCartOpen(false)}>
                      <Button variant="primary" size="lg" className="w-full">
                        View Cart
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

