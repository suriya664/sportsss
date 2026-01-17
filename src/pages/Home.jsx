import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import productsData from '../data/products.json';

const Home = () => {
  const featuredProducts = productsData.slice(0, 4);
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
      <HeroBanner />

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
              FEATURED <span className="text-sunset-orange">GEAR</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-2xl mx-auto px-4">
              Discover our handpicked selection of premium outdoor sports equipment. Each product is carefully 
              selected for quality, durability, and performance to help you excel in your sport.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
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

      {/* Why Choose Us Section */}
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
              WHY CHOOSE <span className="text-sunset-orange">SPORTSEQUIP</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-3xl mx-auto">
              We're committed to providing you with the best sports equipment and shopping experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: '🚚',
                title: 'Free Shipping',
                description: 'Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.',
                bgColor: 'bg-forest-green',
                textColor: 'text-white',
                descColor: 'text-green-100',
              },
              {
                icon: '🔒',
                title: 'Secure Payment',
                description: '100% secure checkout no card. Your data is always protected.',
                bgColor: 'bg-blue-600',
                textColor: 'text-white',
                descColor: 'text-blue-100',
              },
              {
                icon: '↩️',
                title: 'Easy Returns',
                description: "30-day hassle-free return policy. If you're not satisfied, we'll make it right.",
                bgColor: 'bg-sunset-orange',
                textColor: 'text-white',
                descColor: 'text-white',
              },
              {
                icon: '⭐',
                title: 'Quality Guaranteed',
                description: 'All products are carefully selected and tested. We stand behind every item we sell.',
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
                className={`${feature.bgColor} ${feature.border || ''} text-center p-6 sm:p-8 rounded-lg hover:shadow-lg transition-shadow min-h-[220px] flex flex-col justify-center`}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className={`font-nunito font-extrabold text-xl sm:text-2xl mb-2 ${feature.textColor}`}>
                  {feature.title}
                </h3>
                <p className={`font-lato text-sm sm:text-base ${feature.descColor}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
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
              SHOP BY <span className="text-sunset-orange">CATEGORY</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-green-100 max-w-3xl mx-auto">
              Explore our wide range of sports equipment organized by category. Find exactly what you need 
              for your favorite sport or activity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&auto=format', link: '/shop?category=shoes', description: 'Running, training, and athletic footwear' },
              { name: 'Apparel', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&auto=format', link: '/shop?category=apparel', description: 'Performance clothing and activewear' },
              { name: 'Balls', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&h=500&fit=crop&auto=format', link: '/shop?category=balls', description: 'Sports balls for all activities' },
              { name: 'Equipment', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format', link: '/shop?category=equipment', description: 'Training and sports equipment' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden glossy-card cursor-pointer group"
              >
                <Link to={category.link}>
                  <img
                    src={getCategoryImage(category)}
                    alt={category.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => handleImageError(category.name)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-green to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="font-nunito font-extrabold text-xl sm:text-2xl text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="font-lato text-green-100 text-xs sm:text-sm mb-2">
                      {category.description}
                    </p>
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
              WHAT OUR <span className="text-sunset-orange">CUSTOMERS</span> SAY
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-3xl mx-auto">
              Don't just take our word for it. See what athletes like you are saying about SPORTSEQUIP.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Michael Johnson',
                role: 'Professional Runner',
                quote: 'The quality of equipment I found here is unmatched. Fast shipping and excellent customer service. Highly recommend!',
                rating: 5,
              },
              {
                name: 'Sarah Williams',
                role: 'Fitness Enthusiast',
                quote: 'Great selection and competitive prices. I always find what I need, and the return process is super easy.',
                rating: 5,
              },
              {
                name: 'David Martinez',
                role: 'Team Coach',
                quote: 'Ordered equipment for our entire team. The bulk order process was smooth, and everything arrived on time.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white glossy-card p-6 sm:p-8 min-h-[280px] flex flex-col"
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
      <section className="py-12 sm:py-20 bg-sunset-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              READY FOR ADVENTURE?
            </h2>
            <p className="font-lato text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
              Join thousands of outdoor enthusiasts who trust SPORTSEQUIP for their gear needs. 
              Start shopping today and discover why we're the preferred choice for athletes worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button variant="secondary" size="xl" className="!text-white">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="xl" className="!border-2 !border-white !text-white hover:!bg-white hover:!text-sunset-orange">
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

export default Home;
