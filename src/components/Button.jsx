import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseStyles = 'font-nunito font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md';
  
  const variants = {
    primary: 'bg-sunset-orange text-white hover:bg-orange-600 hover:shadow-lg active:scale-95 shadow-md',
    secondary: 'bg-forest-green text-white hover:bg-green-700 hover:shadow-lg active:scale-95 shadow-md',
    outline: 'border-2 border-sunset-orange text-sunset-orange hover:bg-sunset-orange hover:text-white',
    ghost: 'text-sunset-orange hover:bg-orange-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
