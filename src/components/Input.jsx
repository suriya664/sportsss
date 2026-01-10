import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  className = '',
  error = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-lato font-semibold mb-2 text-forest-green">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 border-2 border-mountain-gray rounded-md
          font-lato focus:outline-none focus:border-sunset-orange
          transition-colors duration-300 bg-white
          ${error ? 'border-sunset-orange' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-sunset-orange font-lato">{error}</p>
      )}
    </div>
  );
};

export default Input;
