import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const allCategories = ['all', ...categories];

  return (
    <div className="mb-8">
      <h3 className="font-nunito font-extrabold text-xl mb-4 text-forest-green">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 py-2 font-nunito font-bold uppercase text-sm transition-all duration-300 rounded-md
              ${
                selectedCategory === category
                  ? 'bg-sunset-orange text-white shadow-md'
                  : 'bg-white text-forest-green border-2 border-mountain-gray hover:border-sunset-orange'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category === 'all' ? 'All Products' : category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
