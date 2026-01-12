import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Input from '../components/Input';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-mountain-gray py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-4">
            GET IN <span className="text-sunset-orange">TOUCH</span>
          </h1>
          <p className="font-lato text-base sm:text-lg text-earth-brown max-w-3xl mx-auto">
            Have a question? We'd love to hear from you. Our team is here to help you find the perfect sports equipment 
            and answer any questions you may have. Reach out to us through any of the channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white glossy-card p-6 sm:p-8 lg:p-10 order-2 lg:order-1 min-h-[500px]"
          >
            <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4 sm:mb-6">
              SEND US A MESSAGE
            </h2>
            <p className="font-lato text-earth-brown text-sm sm:text-base mb-6">
              Fill out the form below and we'll get back to you within 24 hours. For urgent inquiries, 
              please call us directly at +1 (555) 123-4567.
            </p>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-green-100 text-green-800 font-lato text-sm sm:text-base rounded-md"
              >
                Thank you! Your message has been sent successfully. We'll respond to you shortly.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Your full name"
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="your@email.com"
              />
              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="What's this about?"
              />
              <div>
                <label className="block text-sm font-lato font-semibold mb-2 text-forest-green">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className={`
                    w-full px-4 py-3 border-2 border-mountain-gray rounded-md
                    font-lato focus:outline-none focus:border-sunset-orange
                    transition-colors duration-300 bg-white resize-none
                    ${errors.message ? 'border-sunset-orange' : ''}
                  `}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-sunset-orange font-lato">
                    {errors.message}
                  </p>
                )}
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 lg:space-y-8 order-1 lg:order-2"
          >
            <div className="bg-white glossy-card p-6 sm:p-8 lg:p-10 min-h-[400px]">
              <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4 sm:mb-6">
                CONTACT INFORMATION
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-nunito font-extrabold text-base sm:text-lg text-sunset-orange mb-2 flex items-center">
                    <span className="mr-2">📍</span>
                    Address
                  </h3>
                  <p className="font-lato text-sm sm:text-base text-earth-brown ml-6">
                    123 Sports Avenue<br />
                    Athletic City, AC 12345<br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="font-nunito font-extrabold text-base sm:text-lg text-sunset-orange mb-2 flex items-center">
                    <span className="mr-2">📞</span>
                    Phone
                  </h3>
                  <p className="font-lato text-sm sm:text-base text-earth-brown ml-6">
                    +1 (555) 123-4567<br />
                    <span className="text-xs text-earth-brown">Available Mon-Fri, 9 AM - 6 PM EST</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-nunito font-extrabold text-base sm:text-lg text-sunset-orange mb-2 flex items-center">
                    <span className="mr-2">📧</span>
                    Email
                  </h3>
                  <p className="font-lato text-sm sm:text-base text-earth-brown ml-6">
                    info@sportsequip.com<br />
                    support@sportsequip.com<br />
                    <span className="text-xs text-earth-brown">We respond within 24 hours</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-nunito font-extrabold text-base sm:text-lg text-sunset-orange mb-2 flex items-center">
                    <span className="mr-2">🕐</span>
                    Business Hours
                  </h3>
                  <p className="font-lato text-sm sm:text-base text-earth-brown ml-6">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-sunset-orange text-white p-6 sm:p-8 glossy-card">
              <h3 className="font-nunito font-extrabold text-xl sm:text-2xl mb-4">
                FOLLOW US
              </h3>
              <p className="font-lato mb-4 text-sm sm:text-base">
                Stay connected with us on social media for the latest updates,
                new arrivals, exclusive offers, and sports tips from our experts.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {/* Facebook */}
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Facebook"
                >
                  <svg className="h-6 w-6" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>

                {/* Twitter/X */}
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Twitter"
                >
                  <svg className="h-6 w-6" fill="#000000" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Instagram"
                >
                  <svg className="h-6 w-6" fill="#E4405F" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>

                {/* YouTube */}
                <motion.a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="YouTube"
                >
                  <svg className="h-6 w-6" fill="#FF0000" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </motion.a>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white glossy-card p-6 sm:p-8 lg:p-10 min-h-[200px]">
              <h3 className="font-nunito font-extrabold text-lg sm:text-xl text-forest-green mb-4">
                QUICK LINKS
              </h3>
              <div className="space-y-3">
                <a href="#faq" className="block font-lato text-earth-brown hover:text-sunset-orange transition-colors">
                  → Frequently Asked Questions
                </a>
                <a href="#shipping" className="block font-lato text-earth-brown hover:text-sunset-orange transition-colors">
                  → Shipping & Delivery Information
                </a>
                <a href="#returns" className="block font-lato text-earth-brown hover:text-sunset-orange transition-colors">
                  → Returns & Exchanges Policy
                </a>
                <a href="#warranty" className="block font-lato text-earth-brown hover:text-sunset-orange transition-colors">
                  → Warranty Information
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white glossy-card p-6 sm:p-8 mb-12"
        >
          <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4 sm:mb-6">
            VISIT OUR STORE
          </h2>
          <div className="rounded-lg overflow-hidden shadow-md h-64 sm:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.184132389012!2d-74.0059!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuMiJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location Map - 123 Sports Avenue, Athletic City, AC 12345"
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="font-lato text-earth-brown text-sm sm:text-base mt-4 text-center">
            123 Sports Avenue, Athletic City, AC 12345, United States
          </p>
        </motion.div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Customer Support',
              description: 'Our support team is available Monday through Friday to assist with any questions or concerns.',
              icon: '💬',
            },
            {
              title: 'Product Inquiries',
              description: 'Need help choosing the right equipment? Our product specialists are here to guide you.',
              icon: '🎯',
            },
            {
              title: 'Bulk Orders',
              description: 'Looking to order equipment for your team or organization? Contact us for special pricing.',
              icon: '📦',
            },
          ].map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white glossy-card p-6 sm:p-8 text-center min-h-[250px] flex flex-col justify-center"
            >
              <div className="text-4xl mb-4">{info.icon}</div>
              <h3 className="font-nunito font-extrabold text-lg sm:text-xl text-forest-green mb-2">
                {info.title}
              </h3>
              <p className="font-lato text-earth-brown text-sm sm:text-base">
                {info.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
