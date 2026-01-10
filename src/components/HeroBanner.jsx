import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';

const HeroBanner = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-forest-green">
      {/* Parallax Mountain Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop)',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Warm Sunlight Filter Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-200/20 via-transparent to-forest-green/60" />
      
      {/* Mountain Texture Overlay */}
      <div className="absolute inset-0 mountain-texture opacity-30" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-nunito font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 text-shadow-nature"
        >
          CONQUER THE
          <br />
          <span className="text-sunset-orange">MOUNTAIN</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-lato text-xl md:text-2xl text-white mb-8"
        >
          Premium outdoor sports equipment for your next adventure
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/shop">
            <Button variant="primary" size="xl">
              Explore Gear
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="xl" className="bg-transparent border-white text-white hover:bg-white hover:text-forest-green">
              Our Story
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Mountain Silhouette Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest-green via-green-800 to-transparent" />
    </div>
  );
};

export default HeroBanner;
