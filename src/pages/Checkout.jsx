import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        // Save order to localStorage for admin dashboard
        const orders = JSON.parse(localStorage.getItem('sportsOrders') || '[]');
        const newOrder = {
          id: `ORD-${Date.now()}`,
          email: formData.email,
          items: cart,
          total: subtotal + shipping + tax,
          shipping: {
            name: `${formData.firstName} ${formData.lastName}`,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
          },
          date: new Date().toISOString(),
          status: 'completed',
        };
        orders.push(newOrder);
        localStorage.setItem('sportsOrders', JSON.stringify(orders));

        clearCart();
        navigate('/checkout/success');
      }, 2000);
    }
  };

  const subtotal = getCartTotal();
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-mountain-gray py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-8 sm:mb-12 text-center sm:text-left">
          CHECKOUT
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white glossy-card p-6 sm:p-8"
              >
                <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4 sm:mb-6">
                  CONTACT INFORMATION
                </h2>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="your@email.com"
                />
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white glossy-card p-6 sm:p-8"
              >
                <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4 sm:mb-6">
                  SHIPPING ADDRESS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />
                </div>
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  className="mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                  />
                  <Input
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={errors.zipCode}
                  />
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white glossy-card p-6 sm:p-8"
              >
                <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4 sm:mb-6">
                  PAYMENT INFORMATION
                </h2>
                <Input
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  error={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  className="mb-4"
                />
                <Input
                  label="Cardholder Name"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  error={errors.cardName}
                  className="mb-4"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    error={errors.expiryDate}
                    placeholder="MM/YY"
                  />
                  <Input
                    label="CVV"
                    name="cvv"
                    type="password"
                    value={formData.cvv}
                    onChange={handleChange}
                    error={errors.cvv}
                    placeholder="123"
                  />
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white glossy-card p-6 sm:p-8 sticky top-24 min-h-[500px]">
                <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4 sm:mb-6">
                  ORDER SUMMARY
                </h2>
                
                <div className="space-y-2 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm font-inter">
                      <span className="text-titanium-gray">
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-titanium-gray pt-4 space-y-2 mb-6">
                  <div className="flex justify-between font-inter">
                    <span className="text-titanium-gray">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-inter">
                    <span className="text-titanium-gray">Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-inter">
                    <span className="text-titanium-gray">Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                <div className="border-t border-mountain-gray pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-nunito font-extrabold text-xl text-forest-green">Total:</span>
                    <span className="font-nunito font-extrabold text-2xl text-sunset-orange">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Complete Order'}
                </Button>

                <p className="font-inter text-xs text-titanium-gray text-center mt-4">
                  🔒 100% secure checkout no card
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

