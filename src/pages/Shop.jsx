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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

        {/* Filter Button for Mobile/Tablet */}
        <div className="mb-6 flex justify-center lg:hidden">
          <motion.button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-forest-green text-white px-6 py-3 rounded-lg font-nunito font-bold shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filters</span>
          </motion.button>
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

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Mobile Filter Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            x: isFilterOpen ? 0 : '-100%',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl overflow-y-auto lg:hidden"
        >
          <div className="p-4 sm:p-6">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-nunito font-extrabold text-2xl text-forest-green">
                Filters
              </h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-mountain-gray rounded-full transition-colors"
                aria-label="Close filters"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-forest-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                handleCategoryChange(category);
                setIsFilterOpen(false);
              }}
            />
            <PriceFilter
              priceRange={priceRange}
              onPriceChange={(range) => {
                handlePriceChange(range);
              }}
            />
          </div>
        </motion.aside>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 order-2 lg:order-1">
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

