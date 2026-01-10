import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import CartDrawer from './CartDrawer';
import Button from './Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const dashboardMenuRef = useRef(null);
  const { getCartItemCount, setIsCartOpen } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const cartItemCount = getCartItemCount();
  const wishlistCount = getWishlistCount();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/home2', label: 'Home 2' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (dashboardMenuRef.current && !dashboardMenuRef.current.contains(event.target)) {
        setIsDashboardMenuOpen(false);
      }
    };

    if (isUserMenuOpen || isDashboardMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen, isDashboardMenuOpen]);

  return (
    <>
      <nav className="bg-forest-green text-white sticky top-0 z-50 shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20 w-full relative">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 z-10">
              <motion.div
                className="font-nunito font-extrabold text-xl sm:text-2xl md:text-3xl text-sunset-orange"
                whileHover={{ scale: 1.1 }}
              >
                SPORTSEQUIP
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-nunito font-bold text-lg uppercase tracking-wider hover:text-sunset-orange transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              {/* Dashboard Dropdown - Always Visible */}
              <div className="relative" ref={dashboardMenuRef}>
                <motion.button
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                    } else {
                      setIsDashboardMenuOpen(!isDashboardMenuOpen);
                    }
                  }}
                  className="font-nunito font-bold text-lg uppercase tracking-wider hover:text-sunset-orange transition-colors duration-300 flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Dashboard</span>
                  {user && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform ${isDashboardMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </motion.button>

                {user && (
                  <AnimatePresence>
                    {isDashboardMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 border border-mountain-gray"
                      >
                        {isAdmin() && (
                          <Link
                            to="/admin-dashboard"
                            onClick={() => setIsDashboardMenuOpen(false)}
                            className="block px-4 py-2 font-lato text-forest-green hover:bg-mountain-gray transition-colors"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          to="/staff-dashboard"
                          onClick={() => setIsDashboardMenuOpen(false)}
                          className="block px-4 py-2 font-lato text-forest-green hover:bg-mountain-gray transition-colors"
                        >
                          Staff Dashboard
                        </Link>
                        <Link
                          to="/user-dashboard"
                          onClick={() => setIsDashboardMenuOpen(false)}
                          className="block px-4 py-2 font-lato text-forest-green hover:bg-mountain-gray transition-colors"
                        >
                          User Dashboard
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4 ml-auto flex-shrink-0">
              {/* User Menu - Visible on all screen sizes, dropdown on right */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 hover:text-sunset-orange transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="hidden md:block font-lato text-sm">
                      {user.name}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-mountain-gray"
                        style={{ 
                          right: '0',
                          maxWidth: 'calc(100vw - 2rem)',
                          minWidth: '200px'
                        }}
                      >
                        <Link
                          to="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 font-lato text-forest-green hover:bg-mountain-gray transition-colors"
                        >
                          My Account
                        </Link>
                        {isAdmin() && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-4 py-2 font-lato text-forest-green hover:bg-mountain-gray transition-colors"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 font-lato text-sunset-orange hover:bg-mountain-gray transition-colors"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-2">
                  <Link to="/register">
                    <motion.button
                      className="font-nunito font-bold text-xs sm:text-sm uppercase px-2 sm:px-4 py-1.5 sm:py-2 border-2 border-white hover:bg-white hover:text-forest-green transition-colors rounded-md whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Register
                    </motion.button>
                  </Link>
                  <Link to="/login">
                    <motion.button
                      className="font-nunito font-bold text-xs sm:text-sm uppercase px-2 sm:px-4 py-1.5 sm:py-2 bg-sunset-orange hover:bg-orange-600 transition-colors rounded-md whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Wishlist Icon */}
              <Link to="/wishlist">
                <motion.button
                  className="relative p-2 hover:text-sunset-orange transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-sunset-orange text-white text-xs font-nunito font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Cart Icon */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:text-sunset-orange transition-colors flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-sunset-orange text-white text-xs font-nunito font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:text-sunset-orange transition-colors flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2 bg-green-800">
                       {navLinks.map((link) => (
                         <Link
                           key={link.path}
                           to={link.path}
                           onClick={() => setIsMenuOpen(false)}
                           className="block font-nunito font-bold text-base uppercase tracking-wider py-2 hover:text-sunset-orange transition-colors text-center"
                         >
                           {link.label}
                         </Link>
                       ))}
                       {/* Dashboard - Always Visible */}
                       <div className="space-y-2">
                         <button
                           onClick={() => {
                             if (!user) {
                               navigate('/login');
                               setIsMenuOpen(false);
                             } else {
                               setIsDashboardMenuOpen(!isDashboardMenuOpen);
                             }
                           }}
                           className="w-full font-nunito font-bold text-base uppercase tracking-wider py-2 hover:text-sunset-orange transition-colors text-center flex items-center justify-center space-x-1"
                         >
                           <span>Dashboard</span>
                           {user && (
                             <svg
                               xmlns="http://www.w3.org/2000/svg"
                               className={`h-4 w-4 transition-transform ${isDashboardMenuOpen ? 'rotate-180' : ''}`}
                               fill="none"
                               viewBox="0 0 24 24"
                               stroke="currentColor"
                             >
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                             </svg>
                           )}
                         </button>
                         {user && isDashboardMenuOpen && (
                           <div className="pl-4 space-y-2">
                             {isAdmin() && (
                               <Link
                                 to="/admin-dashboard"
                                 onClick={() => {
                                   setIsMenuOpen(false);
                                   setIsDashboardMenuOpen(false);
                                 }}
                                 className="block font-nunito font-bold text-sm uppercase tracking-wider py-2 hover:text-sunset-orange transition-colors text-center"
                               >
                                 Admin Dashboard
                               </Link>
                             )}
                             <Link
                               to="/staff-dashboard"
                               onClick={() => {
                                 setIsMenuOpen(false);
                                 setIsDashboardMenuOpen(false);
                               }}
                               className="block font-nunito font-bold text-sm uppercase tracking-wider py-2 hover:text-sunset-orange transition-colors text-center"
                             >
                               Staff Dashboard
                             </Link>
                             <Link
                               to="/user-dashboard"
                               onClick={() => {
                                 setIsMenuOpen(false);
                                 setIsDashboardMenuOpen(false);
                               }}
                               className="block font-nunito font-bold text-sm uppercase tracking-wider py-2 hover:text-sunset-orange transition-colors text-center"
                             >
                               User Dashboard
                             </Link>
                           </div>
                         )}
                       </div>
                       <Link
                         to="/wishlist"
                         onClick={() => setIsMenuOpen(false)}
                         className="block font-nunito font-bold text-base uppercase tracking-wider py-2 hover:text-sunset-orange transition-colors text-center"
                       >
                         Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                       </Link>
                {user ? (
                  <>
                    <Link
                      to="/account"
                      onClick={() => setIsMenuOpen(false)}
                      className="block font-nunito font-bold text-base uppercase tracking-wider py-2 hover:text-sunset-orange transition-colors text-center"
                    >
                      My Account
                    </Link>
                    {isAdmin() && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block font-nunito font-bold text-base uppercase tracking-wider py-2 hover:text-sunset-orange transition-colors text-center"
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full font-nunito font-bold text-base uppercase tracking-wider py-2 hover:text-sunset-orange transition-colors text-center"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 pt-2">
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full"
                      >
                        <Button
                          variant="outline"
                          size="md"
                          className="w-full border-2 border-white text-white hover:bg-white hover:text-forest-green"
                        >
                          Register
                        </Button>
                      </Link>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full"
                      >
                        <Button
                          variant="primary"
                          size="md"
                          className="w-full"
                        >
                          Login
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <CartDrawer />
    </>
  );
};

export default Navbar;
