import React from 'react';
import { motion } from 'framer-motion';

const PriceFilter = ({ priceRange, onPriceChange }) => {
  const priceRanges = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $150', min: 100, max: 150 },
    { label: 'Over $150', min: 150, max: Infinity },
  ];

  return (
    <div className="mb-8">
      <h3 className="font-nunito font-extrabold text-xl mb-4 text-forest-green">Price Range</h3>
      <div className="space-y-2">
        {priceRanges.map((range) => (
          <motion.button
            key={range.label}
            onClick={() => onPriceChange({ min: range.min, max: range.max })}
            className={`
              w-full text-left px-4 py-2 font-lato text-sm transition-all duration-300 rounded-md
              ${
                priceRange.min === range.min && priceRange.max === range.max
                  ? 'bg-sunset-orange text-white shadow-md'
                  : 'bg-white text-forest-green border-2 border-mountain-gray hover:border-sunset-orange'
              }
            `}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            {range.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PriceFilter;
