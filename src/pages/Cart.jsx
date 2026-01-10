import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-mountain-gray py-12 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-6">
              YOUR CART IS <span className="text-sunset-orange">EMPTY</span>
            </h1>
            <p className="font-lato text-lg text-earth-brown mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mountain-gray py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-8 sm:mb-12 text-center sm:text-left">
          SHOPPING <span className="text-sunset-orange">CART</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white glossy-card p-6 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 min-h-[180px]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-nunito font-extrabold text-lg sm:text-xl text-forest-green mb-2">
                    {item.name}
                  </h3>
                  <p className="font-lato text-sm text-earth-brown mb-4">
                    {item.brand} • {item.category}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-nunito font-extrabold text-lg text-sunset-orange">
                        ${item.price.toFixed(2)}
                      </span>
                      <div className="flex items-center border-2 border-mountain-gray rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-mountain-gray transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 font-lato min-w-[3rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-mountain-gray transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-nunito font-extrabold text-xl text-forest-green mb-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sunset-orange hover:text-orange-600 font-lato text-sm transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
              <Link to="/shop" className="font-lato text-sunset-orange hover:underline">
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="font-lato text-sunset-orange hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white glossy-card p-6 sm:p-8 sticky top-24 min-h-[400px]">
              <h2 className="font-nunito font-extrabold text-2xl text-forest-green mb-6">
                ORDER SUMMARY
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between font-lato">
                  <span className="text-earth-brown">Subtotal:</span>
                  <span className="font-semibold text-forest-green">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-lato">
                  <span className="text-earth-brown">Shipping:</span>
                  <span className="font-semibold text-forest-green">$10.00</span>
                </div>
                <div className="flex justify-between font-lato">
                  <span className="text-earth-brown">Tax:</span>
                  <span className="font-semibold text-forest-green">
                    ${(getCartTotal() * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-mountain-gray pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-nunito font-extrabold text-xl text-forest-green">Total:</span>
                    <span className="font-nunito font-extrabold text-2xl text-sunset-orange">
                      ${(getCartTotal() + 10 + getCartTotal() * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full mb-4"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>

              <p className="font-lato text-xs text-earth-brown text-center">
                100% secure checkout no card • Free returns • 30-day guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
