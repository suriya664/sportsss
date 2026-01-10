import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/Button';
import productsData from '../data/products.json';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-mountain-gray flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-forest-green mb-4">
            Product Not Found
          </h2>
          <Link to="/shop">
            <Button variant="primary">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-mountain-gray py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8">
          <div className="flex items-center flex-wrap space-x-2 text-xs sm:text-sm font-lato text-earth-brown">
            <Link to="/" className="hover:text-sunset-orange transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-sunset-orange transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-forest-green truncate">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-20">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="glossy-card overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {[product.image, product.image, product.image, product.image].map(
                (img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`glossy-card overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-sunset-orange' : ''
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-16 sm:h-20 object-cover"
                    />
                  </button>
                )
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <span className="font-nunito font-extrabold text-sunset-orange text-sm sm:text-lg uppercase tracking-wider">
                {product.brand}
              </span>
              <h1 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mt-2 mb-4">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center">
                  <span className="text-sunset-orange text-lg sm:text-xl mr-1">★</span>
                  <span className="font-lato text-base sm:text-lg text-earth-brown font-semibold">{product.rating}</span>
                </div>
                <span className="text-mountain-gray hidden sm:inline">|</span>
                <span className="font-lato text-sm sm:text-base text-earth-brown">
                  Category: {product.category}
                </span>
              </div>
            </div>

            <div className="border-t border-b border-mountain-gray py-4 sm:py-6">
              <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                <span className="font-nunito font-extrabold text-3xl sm:text-4xl text-sunset-orange">
                  ${product.price.toFixed(2)}
                </span>
                {product.inStock ? (
                  <span className="font-lato text-green-600 font-semibold text-sm sm:text-base">
                    In Stock
                  </span>
                ) : (
                  <span className="font-lato text-sunset-orange font-semibold text-sm sm:text-base">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <p className="font-lato text-earth-brown leading-relaxed text-sm sm:text-base mb-4">
              {product.description}
            </p>

            {/* Product Features */}
            <div className="bg-mountain-gray p-4 sm:p-6 rounded-lg">
              <h3 className="font-nunito font-extrabold text-lg sm:text-xl text-forest-green mb-3">
                Key Features
              </h3>
              <ul className="space-y-2 font-lato text-sm sm:text-base text-earth-brown">
                <li className="flex items-start">
                  <span className="text-sunset-orange mr-2">✓</span>
                  <span>Premium quality materials for durability and performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-orange mr-2">✓</span>
                  <span>Designed for optimal comfort and functionality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-orange mr-2">✓</span>
                  <span>Tested and approved by professional athletes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-orange mr-2">✓</span>
                  <span>30-day money-back guarantee</span>
                </li>
              </ul>
            </div>

            {/* Shipping & Returns Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  icon: '🚚',
                  title: 'Free Shipping',
                  description: 'On orders over $50',
                  bgColor: 'bg-forest-green',
                  textColor: 'text-white',
                  descColor: 'text-green-100',
                },
                {
                  icon: '↩️',
                  title: 'Easy Returns',
                  description: '30-day return policy',
                  bgColor: 'bg-sunset-orange',
                  textColor: 'text-white',
                  descColor: 'text-white',
                },
                {
                  icon: '🔒',
                  title: 'Secure Payment',
                  description: '100% secure checkout no card',
                  bgColor: 'bg-blue-600',
                  textColor: 'text-white',
                  descColor: 'text-blue-100',
                },
                {
                  icon: '⭐',
                  title: 'Quality Guaranteed',
                  description: 'Premium products only',
                  bgColor: 'bg-white',
                  textColor: 'text-forest-green',
                  descColor: 'text-earth-brown',
                  border: 'border-2 border-sunset-orange',
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className={`${feature.bgColor} ${feature.border || ''} p-4 sm:p-5 rounded-lg text-center min-h-[140px] sm:min-h-[160px] flex flex-col justify-center`}
                >
                  <div className="text-3xl sm:text-4xl mb-2">{feature.icon}</div>
                  <p className={`font-nunito font-extrabold text-xs sm:text-sm mb-1 ${feature.textColor}`}>
                    {feature.title}
                  </p>
                  <p className={`font-lato text-xs ${feature.descColor}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {product.inStock && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="font-nunito font-extrabold text-base sm:text-lg text-forest-green">
                    Quantity:
                  </label>
                  <div className="flex items-center border-2 border-mountain-gray rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-mountain-gray transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 font-lato min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-mountain-gray transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:flex-1"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => toggleWishlist(product)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-sunset-orange'}`}
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
                      <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Product Specifications */}
        <div className="bg-white glossy-card p-6 sm:p-8 mb-12">
          <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-forest-green mb-6">
            PRODUCT <span className="text-sunset-orange">SPECIFICATIONS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-3">General Information</h3>
              <div className="space-y-2 font-lato text-sm sm:text-base text-earth-brown">
                <div className="flex justify-between py-2 border-b border-mountain-gray">
                  <span className="font-semibold">Brand:</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-mountain-gray">
                  <span className="font-semibold">Category:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-mountain-gray">
                  <span className="font-semibold">Rating:</span>
                  <span className="flex items-center">
                    <span className="text-sunset-orange mr-1">★</span>
                    {product.rating} / 5.0
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-mountain-gray">
                  <span className="font-semibold">Availability:</span>
                  <span className={product.inStock ? "text-green-600 font-semibold" : "text-sunset-orange font-semibold"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-3">Shipping & Warranty</h3>
              <div className="space-y-2 font-lato text-sm sm:text-base text-earth-brown">
                <div className="flex justify-between py-2 border-b border-mountain-gray">
                  <span className="font-semibold">Shipping:</span>
                  <span>2-5 business days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-mountain-gray">
                  <span className="font-semibold">Warranty:</span>
                  <span>1 year manufacturer warranty</span>
                </div>
                <div className="flex justify-between py-2 border-b border-mountain-gray">
                  <span className="font-semibold">Return Policy:</span>
                  <span>30 days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-mountain-gray">
                  <span className="font-semibold">Support:</span>
                  <span>24/7 customer service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white glossy-card p-6 sm:p-8 mb-12">
          <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-forest-green mb-6">
            CUSTOMER <span className="text-sunset-orange">REVIEWS</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                name: 'Sarah Johnson',
                rating: 5,
                date: '2 days ago',
                review: 'Excellent product! The quality exceeded my expectations. Very comfortable and durable. Highly recommend!',
              },
              {
                name: 'Mike Chen',
                rating: 5,
                date: '1 week ago',
                review: 'Great value for money. Fast shipping and the product arrived in perfect condition. Will definitely order again.',
              },
              {
                name: 'Emily Davis',
                rating: 4,
                date: '2 weeks ago',
                review: 'Good quality product. Does exactly what it\'s supposed to do. Minor issue with sizing but overall satisfied.',
              },
            ].map((review, index) => (
              <div key={index} className="border-b border-mountain-gray pb-6 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-nunito font-extrabold text-base text-forest-green">{review.name}</p>
                    <p className="font-lato text-xs text-earth-brown">{review.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                </div>
                <p className="font-lato text-sm sm:text-base text-earth-brown leading-relaxed">{review.review}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-mountain-gray">
            <Button variant="outline" size="md">
              Write a Review
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mb-6 sm:mb-8 text-center sm:text-left">
              RELATED <span className="text-sunset-orange">PRODUCTS</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="glossy-card group cursor-pointer h-full flex flex-col">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-nunito font-extrabold text-base sm:text-lg text-forest-green group-hover:text-sunset-orange transition-colors mb-2 line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                        <p className="font-nunito font-extrabold text-sunset-orange mt-auto">
                          ${relatedProduct.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
