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
      {/* Hero Section with Split Layout */}
      <section className="relative bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
          {/* Left Side - Content */}
          <div className="flex items-center justify-center bg-gradient-to-br from-forest-green to-green-800 text-white p-8 sm:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-nunito font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6"
              >
                PERFORMANCE
                <br />
                <span className="text-sunset-orange">REDEFINED</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-lato text-lg sm:text-xl mb-8 text-green-100"
              >
                Where champions are made. Experience the difference with professional-grade sports equipment that elevates every game, every training session, every moment.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/shop">
                  <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                    Explore Collection
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-forest-green">
                    Get Expert Advice
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right Side - Image/Visual */}
          <div className="relative bg-gradient-to-br from-mountain-gray to-gray-300 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-green/20 to-sunset-orange/20"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-10 text-center p-8"
            >
              <div className="text-9xl mb-4">🏆</div>
              <h3 className="font-nunito font-extrabold text-3xl text-forest-green mb-4">
                CHAMPION'S CHOICE
              </h3>
              <p className="font-lato text-lg text-earth-brown max-w-md mx-auto">
                Trusted by professional athletes and teams worldwide
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-8 bg-gradient-to-r from-sunset-orange to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-nunito font-extrabold text-2xl sm:text-3xl mb-2">
                🎉 LIMITED TIME OFFER
              </h3>
              <p className="font-lato text-lg">
                Get 25% off on all premium equipment. Use code: <span className="font-bold">CHAMPION25</span>
              </p>
            </div>
            <Link to="/shop">
              <Button variant="secondary" size="lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-4">
              BEST <span className="text-sunset-orange">SELLERS</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-2xl mx-auto">
              Top-rated products loved by athletes and fitness enthusiasts. These are the game-changers you've been looking for.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -top-3 -right-3 bg-sunset-orange text-white px-3 py-1 rounded-full text-xs font-nunito font-bold z-10">
                  HOT
                </div>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Discover More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video/Showcase Section */}
      <section className="py-12 sm:py-20 bg-mountain-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-6">
                TRAINING <span className="text-sunset-orange">EXCELLENCE</span>
              </h2>
              <p className="font-lato text-lg text-earth-brown mb-6">
                Watch how professional athletes use our equipment to achieve peak performance. From training grounds to championship arenas, we're there every step of the way.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎬</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-xl text-forest-green mb-2">Training Videos</h3>
                    <p className="font-lato text-earth-brown">Access exclusive training content and expert tips</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📚</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-xl text-forest-green mb-2">Expert Guides</h3>
                    <p className="font-lato text-earth-brown">Learn from professionals with our comprehensive guides</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💪</div>
                  <div>
                    <h3 className="font-nunito font-extrabold text-xl text-forest-green mb-2">Performance Tips</h3>
                    <p className="font-lato text-earth-brown">Get insider knowledge to maximize your potential</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-forest-green to-green-800 rounded-2xl overflow-hidden h-96 flex items-center justify-center"
            >
              <div className="text-center text-white p-8">
                <div className="text-8xl mb-4">▶️</div>
                <h3 className="font-nunito font-extrabold text-2xl mb-2">Watch Our Story</h3>
                <p className="font-lato text-green-100">See how we're revolutionizing sports equipment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-forest-green to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              STAY IN THE <span className="text-sunset-orange">GAME</span>
            </h2>
            <p className="font-lato text-lg sm:text-xl mb-8 text-green-100">
              Subscribe to our newsletter and get exclusive deals, training tips, and early access to new products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-forest-green font-lato focus:outline-none focus:ring-2 focus:ring-sunset-orange"
              />
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="font-lato text-sm text-green-200 mt-4">
              Join 50,000+ athletes already subscribed
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Categories Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-4">
              SHOP BY <span className="text-sunset-orange">SPORT</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-2xl mx-auto">
              Find everything you need for your favorite sport in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Running', icon: '🏃', link: '/shop?category=shoes', color: 'from-blue-500 to-blue-600' },
              { name: 'Basketball', icon: '🏀', link: '/shop?category=balls', color: 'from-orange-500 to-orange-600' },
              { name: 'Fitness', icon: '💪', link: '/shop?category=equipment', color: 'from-purple-500 to-purple-600' },
              { name: 'Training', icon: '⚽', link: '/shop?category=apparel', color: 'from-green-500 to-green-600' },
            ].map((sport, index) => (
              <motion.div
                key={sport.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={sport.link}>
                  <div className={`bg-gradient-to-br ${sport.color} text-white rounded-xl p-8 text-center hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center`}>
                    <div className="text-6xl mb-4">{sport.icon}</div>
                    <h3 className="font-nunito font-extrabold text-xl">
                      {sport.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 sm:py-20 bg-mountain-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-4">
              SUCCESS <span className="text-sunset-orange">STORIES</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-3xl mx-auto">
              Real athletes. Real results. See how our equipment helps champions achieve their goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Olympic Athlete',
                achievement: 'Gold Medal Winner',
                quote: 'SPORTSEQUIP equipment has been part of my journey to the Olympics. The quality and performance are unmatched.',
                image: '🏅',
                bgColor: 'from-yellow-400 to-yellow-600',
              },
              {
                name: 'Marcus Johnson',
                role: 'Professional Coach',
                achievement: 'Championship Team',
                quote: 'Our team\'s success is built on quality equipment. SPORTSEQUIP delivers every single time.',
                image: '🏆',
                bgColor: 'from-blue-500 to-blue-600',
              },
            ].map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-xl overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${story.bgColor} text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl mb-6 mx-auto`}>
                  {story.image}
                </div>
                <p className="font-lato text-earth-brown text-lg mb-6 italic text-center leading-relaxed">
                  "{story.quote}"
                </p>
                <div className="text-center">
                  <p className="font-nunito font-extrabold text-forest-green text-xl mb-1">
                    {story.name}
                  </p>
                  <p className="font-lato text-sunset-orange font-semibold mb-1">
                    {story.achievement}
                  </p>
                  <p className="font-lato text-earth-brown text-sm">
                    {story.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '15+', label: 'Years Experience', icon: '📅' },
              { number: '50K+', label: 'Athletes Served', icon: '👥' },
              { number: '100+', label: 'Countries', icon: '🌍' },
              { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-mountain-gray rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest-green mb-2">
                  {stat.number}
                </p>
                <p className="font-lato text-earth-brown text-sm sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-forest-green via-green-800 to-forest-green text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              BEGIN YOUR <span className="text-sunset-orange">JOURNEY</span>
            </h2>
            <p className="font-lato text-lg sm:text-xl md:text-2xl mb-8 text-green-100">
              Transform your performance with professional-grade equipment. Your path to excellence starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button variant="secondary" size="xl" className="shadow-2xl">
                  Browse Collection
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white hover:text-forest-green shadow-xl">
                  Contact Expert
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

