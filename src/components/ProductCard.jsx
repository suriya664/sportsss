import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback image based on category
  const getFallbackImage = () => {
    const categoryImages = {
      shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&auto=format',
      apparel: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&auto=format',
      balls: 'https://images.unsplash.com/photo-1622163642999-7f95f7b0b0e5?w=500&h=500&fit=crop&auto=format',
      equipment: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format',
    };
    return categoryImages[product.category] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="glossy-card group cursor-pointer h-full flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="block flex flex-col h-full">
        <div className="relative overflow-hidden bg-white flex-shrink-0">
          <motion.img
            src={imageError ? getFallbackImage() : product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            onError={handleImageError}
            loading="lazy"
          />
          {!product.inStock && (
            <div className="absolute top-4 right-4 bg-forest-green text-white px-3 py-1 font-nunito font-bold text-xs rounded-md">
              OUT OF STOCK
            </div>
          )}
          <div className="absolute top-4 left-4 bg-sunset-orange text-white px-3 py-1 font-nunito font-bold text-xs rounded-md shadow-md">
            {product.brand}
          </div>
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors z-10"
            aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              viewBox="0 0 20 20"
              fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
              stroke="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        
        <div className="p-6 flex flex-col flex-grow min-h-[200px]">
          <h3 className="font-nunito font-extrabold text-lg mb-2 text-forest-green group-hover:text-sunset-orange transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-earth-brown text-sm font-lato mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-nunito font-extrabold text-2xl text-sunset-orange">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <span className="text-sunset-orange mr-1">★</span>
              <span className="text-sm font-lato text-earth-brown font-semibold">
                {product.rating}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full mt-auto"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
