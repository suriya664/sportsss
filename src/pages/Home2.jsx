import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import productsData from '../data/products.json';

const Home2 = () => {
  const featuredProducts = productsData.slice(0, 6);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (categoryName) => {
    setImageErrors((prev) => ({ ...prev, [categoryName]: true }));
  };

  const getCategoryImage = (category) => {
    if (imageErrors[category.name]) {
      const fallbacks = {
        'Balls': 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&h=500&fit=crop&auto=format',
        'Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&auto=format',
        'Apparel': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&auto=format',
        'Equipment': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format',
      };
      return fallbacks[category.name] || category.image;
    }
    return category.image;
  };

  return (
    <div className="min-h-screen">
      {/* New Hero Section */}
      <section className="relative bg-gradient-to-br from-forest-green via-green-800 to-forest-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-nunito font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8"
            >
              ELEVATE YOUR
              <br />
              <span className="text-sunset-orange">GAME</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-lato text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
            >
              Premium sports equipment designed for champions. Discover gear that matches your passion and performance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/shop">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-forest-green">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-mountain-gray to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              { 
                icon: '🚚', 
                title: 'Free Shipping', 
                desc: 'On orders over $50',
                bgColor: 'bg-forest-green',
                textColor: 'text-white',
                descColor: 'text-green-100',
              },
              { 
                icon: '🔒', 
                title: 'Secure Payment', 
                desc: '100% secure checkout no card',
                bgColor: 'bg-blue-600',
                textColor: 'text-white',
                descColor: 'text-blue-100',
              },
              { 
                icon: '↩️', 
                title: 'Easy Returns', 
                desc: '30-day return policy',
                bgColor: 'bg-sunset-orange',
                textColor: 'text-white',
                descColor: 'text-white',
              },
              { 
                icon: '⭐', 
                title: 'Quality Guaranteed', 
                desc: 'Premium products only',
                bgColor: 'bg-white',
                textColor: 'text-forest-green',
                descColor: 'text-earth-brown',
                border: 'border-2 border-sunset-orange',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`${feature.bgColor} ${feature.border || ''} text-center p-6 sm:p-8 rounded-lg hover:shadow-lg transition-shadow min-h-[200px] flex flex-col justify-center`}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className={`font-nunito font-extrabold text-xl mb-2 ${feature.textColor}`}>
                  {feature.title}
                </h3>
                <p className={`font-lato ${feature.descColor}`}>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-20 bg-mountain-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-4">
              FEATURED <span className="text-sunset-orange">PRODUCTS</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-2xl mx-auto px-4">
              Handpicked selection of our best-selling sports equipment. Each product is carefully 
              selected for quality, durability, and performance to help you excel in your sport.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-12 sm:py-20 bg-forest-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              EXPLORE <span className="text-sunset-orange">CATEGORIES</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&auto=format', link: '/shop?category=shoes' },
              { name: 'Apparel', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&auto=format', link: '/shop?category=apparel' },
              { name: 'Balls', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&h=500&fit=crop&auto=format', link: '/shop?category=balls' },
              { name: 'Equipment', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format', link: '/shop?category=equipment' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden glossy-card cursor-pointer group h-64"
              >
                <Link to={category.link}>
                  <img
                    src={getCategoryImage(category)}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => handleImageError(category.name)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-green via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="font-nunito font-extrabold text-2xl sm:text-3xl text-white mb-2">
                      {category.name}
                    </h3>
                    <span className="font-lato text-sunset-orange group-hover:underline font-semibold text-sm sm:text-base">
                      Shop Now →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-4">
              WHAT OUR <span className="text-sunset-orange">CUSTOMERS</span> SAY
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-3xl mx-auto">
              Don't just take our word for it. See what athletes like you are saying about SPORTSEQUIP.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Alex Thompson',
                role: 'Marathon Runner',
                quote: 'The running shoes I bought here transformed my training. Lightweight, comfortable, and durable. Best purchase I\'ve made!',
                rating: 5,
              },
              {
                name: 'Emma Rodriguez',
                role: 'Fitness Trainer',
                quote: 'I order equipment for my entire gym from SPORTSEQUIP. Great quality, fast shipping, and excellent customer service every time.',
                rating: 5,
              },
              {
                name: 'James Wilson',
                role: 'Basketball Coach',
                quote: 'The basketballs and training equipment are top-notch. My team loves the quality, and the prices are unbeatable.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-mountain-gray glossy-card p-6 sm:p-8"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="font-lato text-earth-brown text-sm sm:text-base mb-4 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-mountain-gray pt-4">
                  <p className="font-nunito font-extrabold text-forest-green text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="font-lato text-earth-brown text-xs sm:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-forest-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Products Available' },
              { number: '50+', label: 'Brands Partnered' },
              { number: '24/7', label: 'Customer Support' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-sunset-orange mb-2">
                  {stat.number}
                </p>
                <p className="font-lato text-green-100 text-sm sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-sunset-orange to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              READY TO WIN?
            </h2>
            <p className="font-lato text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
              Join thousands of athletes who trust SPORTSEQUIP for their performance needs. 
              Start shopping today and discover why we're the preferred choice for athletes worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button variant="secondary" size="xl">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white hover:text-sunset-orange">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home2;

