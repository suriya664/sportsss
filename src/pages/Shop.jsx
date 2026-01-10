import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import PriceFilter from '../components/PriceFilter';
import SearchBar from '../components/SearchBar';
import productsData from '../data/products.json';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [searchTerm, setSearchTerm] = useState('');

  // Get categories from products
  const categories = useMemo(() => {
    const cats = [...new Set(productsData.map((p) => p.category))];
    return cats;
  }, []);

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesSearch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [selectedCategory, priceRange, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-mountain-gray py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-4">
            SHOP <span className="text-sunset-orange">ALL PRODUCTS</span>
          </h1>
          <p className="font-lato text-base sm:text-lg text-earth-brown mb-2">
            {filteredProducts.length} products found
          </p>
          <p className="font-lato text-sm sm:text-base text-earth-brown max-w-3xl mx-auto">
            Discover our complete collection of premium sports equipment. Use filters to find exactly what you're looking for, 
            or browse by category to explore our wide selection of quality products.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Quick Category Links */}
        <div className="mb-8 flex flex-wrap justify-center gap-3 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-md font-lato font-semibold text-sm sm:text-base transition-colors ${
                selectedCategory === category
                  ? 'bg-sunset-orange text-white'
                  : 'bg-white text-forest-green hover:bg-mountain-gray'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white p-4 sm:p-6 rounded-md sticky top-24">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              <PriceFilter
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="bg-white glossy-card p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="font-nunito font-extrabold text-2xl text-forest-green mb-4">
                  No Products Found
                </h2>
                <p className="font-lato text-earth-brown mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange({ min: 0, max: Infinity });
                    setSearchTerm('');
                  }}
                  className="font-lato text-sunset-orange hover:underline font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Shopping Guide Section */}
        <div className="mt-12 sm:mt-16 bg-white glossy-card p-6 sm:p-8">
          <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-forest-green mb-6 text-center">
            SHOPPING <span className="text-sunset-orange">GUIDE</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-2">Find Products</h3>
              <p className="font-lato text-sm sm:text-base text-earth-brown">
                Use our search bar or category filters to quickly find the products you need. 
                Filter by price range to stay within your budget.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-2">Compare & Review</h3>
              <p className="font-lato text-sm sm:text-base text-earth-brown">
                Read product descriptions, check ratings, and compare features. 
                Add items to your wishlist to save them for later.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-2">Easy Checkout</h3>
              <p className="font-lato text-sm sm:text-base text-earth-brown">
                Add products to your cart and checkout securely. 
                Enjoy free shipping on orders over $50 and easy returns.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
              className={`${feature.bgColor} ${feature.border || ''} p-6 sm:p-8 rounded-lg text-center min-h-[180px] flex flex-col justify-center`}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <p className={`font-nunito font-extrabold text-base sm:text-lg mb-2 ${feature.textColor}`}>
                {feature.title}
              </p>
              <p className={`font-lato text-sm sm:text-base ${feature.descColor}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;

