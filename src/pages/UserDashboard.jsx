import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [orders, setOrders] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load user orders
    const savedOrders = JSON.parse(localStorage.getItem('sportsOrders') || '[]');
    const userOrders = savedOrders.filter((order) => order.email === user.email);
    setOrders(userOrders);

    // Generate recent activities
    const activities = [
      { id: 1, action: 'Order placed', details: 'Order #1234', time: '2 days ago', type: 'order', icon: '🛒' },
      { id: 2, action: 'Product added to wishlist', details: 'Football', time: '5 days ago', type: 'wishlist', icon: '❤️' },
      { id: 3, action: 'Profile updated', details: 'Email changed', time: '1 week ago', type: 'profile', icon: '👤' },
      { id: 4, action: 'Order delivered', details: 'Order #1230', time: '1 week ago', type: 'order', icon: '📦' },
    ];
    setRecentActivities(activities);
  }, [user, navigate]);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'orders', label: 'My Orders', icon: '🛒' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'activities', label: 'Recent Activities', icon: '📋' },
    { id: 'support', label: 'Support', icon: '💬' },
  ];

  const [activeSection, setActiveSection] = useState('overview');

  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    wishlistItems: wishlist.length,
    pendingOrders: orders.filter((o) => o.status === 'pending' || !o.status).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-mountain-gray flex">
      {/* Enhanced Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isDesktop ? 0 : (sidebarOpen ? 0 : -300) }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-purple-600 to-purple-700 text-white transform transition-transform duration-150 ease-in-out lg:translate-x-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Logo */}
          <div className="p-6 border-b border-purple-500 bg-gradient-to-r from-purple-700 to-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h2 className="font-nunito font-extrabold text-xl text-white">
                    SPORTSEQUIP
                  </h2>
                  <p className="font-lato text-xs text-purple-200">My Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:text-purple-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                  activeSection === item.id
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'hover:bg-purple-600 text-purple-100 hover:shadow-md'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-lato font-semibold">{item.label}</span>
                {item.id === 'wishlist' && wishlist.length > 0 && (
                  <span className="ml-auto bg-pink-500 text-white text-xs rounded-full px-2 py-1 font-bold">
                    {wishlist.length}
                  </span>
                )}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-2 h-2 bg-purple-700 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Enhanced User Info */}
          <div className="p-4 border-t border-purple-500 bg-gradient-to-t from-purple-700 to-transparent">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg ring-2 ring-white ring-offset-2 ring-offset-purple-700">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-700"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-lato font-semibold text-sm truncate text-white">{user?.name}</p>
                <p className="font-lato text-xs text-purple-200 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/')}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-lato text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ← Back to Site
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-lg font-lato text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Enhanced Top Bar */}
        <header className="bg-white shadow-lg sticky top-0 z-30 border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-purple-600 hover:bg-mountain-gray rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="font-nunito font-extrabold text-xl sm:text-2xl text-purple-700">
                  {sidebarItems.find((item) => item.id === activeSection)?.label || 'Dashboard'}
                </h1>
                <p className="font-lato text-xs text-earth-brown hidden sm:block">
                  Welcome back, {user?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-mountain-gray rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-earth-brown mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-purple-700 placeholder-earth-brown text-sm w-40"
                />
              </div>
              <button className="relative p-2 text-purple-600 hover:bg-mountain-gray rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {recentActivities.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gradient-to-br from-gray-50 to-mountain-gray">
          {/* Enhanced Overview Section */}
          {activeSection === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Enhanced Profile Overview */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                  <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                    Profile Overview
                  </h2>
                  <p className="font-lato text-purple-100 text-sm">Your account information</p>
                </div>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-xl ring-4 ring-purple-100">
                        <span className="text-white font-bold text-3xl">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-nunito font-extrabold text-2xl text-forest-green mb-2">
                        {user?.name}
                      </h3>
                      <p className="font-lato text-earth-brown mb-1 text-lg">{user?.email}</p>
                      <p className="font-lato text-sm text-earth-brown">
                        Member since {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <Link to="/account">
                      <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-lato font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-full mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🛒</span>
                    </div>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">+5</span>
                  </div>
                  <h3 className="font-lato text-blue-100 text-sm mb-1">Total Orders</h3>
                  <p className="font-nunito font-extrabold text-4xl">{stats.totalOrders}</p>
                  <p className="font-lato text-xs text-blue-100 mt-2">All time</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <h3 className="font-lato text-green-100 text-sm mb-1">Total Spent</h3>
                  <p className="font-nunito font-extrabold text-4xl">${stats.totalSpent.toFixed(0)}</p>
                  <p className="font-lato text-xs text-green-100 mt-2">Lifetime value</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">❤️</span>
                    </div>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">New</span>
                  </div>
                  <h3 className="font-lato text-pink-100 text-sm mb-1">Wishlist Items</h3>
                  <p className="font-nunito font-extrabold text-4xl">{stats.wishlistItems}</p>
                  <p className="font-lato text-xs text-pink-100 mt-2">Saved products</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Active</span>
                  </div>
                  <h3 className="font-lato text-yellow-100 text-sm mb-1">Pending Orders</h3>
                  <p className="font-nunito font-extrabold text-4xl">{stats.pendingOrders}</p>
                  <p className="font-lato text-xs text-yellow-100 mt-2">In process</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Enhanced My Orders Section */}
          {activeSection === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                  My Orders ({orders.length})
                </h2>
                <p className="font-lato text-blue-100 text-sm">Track your order history</p>
              </div>
              <div className="p-6">
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order, index) => (
                      <div key={order.id} className="border-2 border-mountain-gray rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                              #{index + 1}
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <p className="font-lato font-semibold text-forest-green">Order #{order.id}</p>
                                <span className={`px-3 py-1 rounded-full text-xs font-lato font-semibold ${
                                  order.status === 'delivered'
                                    ? 'bg-green-100 text-green-800'
                                    : order.status === 'shipped'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status || 'Pending'}
                                </span>
                              </div>
                              <p className="font-lato text-sm text-earth-brown">
                                Items: {order.items?.length || 0} • Total: ${order.total?.toFixed(2) || '0.00'}
                              </p>
                              <p className="font-lato text-xs text-earth-brown mt-1">
                                {order.date || 'No date'}
                              </p>
                            </div>
                          </div>
                          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-lato font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-mountain-gray rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🛒</span>
                    </div>
                    <p className="font-lato text-earth-brown text-lg mb-2">No orders yet</p>
                    <p className="font-lato text-sm text-earth-brown mb-4">Start shopping to see your orders here</p>
                    <Link to="/shop">
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-lato font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg">
                        Start Shopping
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Enhanced Wishlist Section */}
          {activeSection === 'wishlist' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                      Wishlist / Saved Products ({wishlist.length})
                    </h2>
                    <p className="font-lato text-pink-100 text-sm">Your favorite products</p>
                  </div>
                  <Link to="/wishlist">
                    <button className="px-6 py-3 bg-white text-pink-600 rounded-xl font-lato font-semibold hover:bg-pink-50 transition-all shadow-lg">
                      View All
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto">
                    {wishlist.slice(0, 6).map((item) => (
                      <div key={item.id} className="border-2 border-mountain-gray rounded-xl p-5 hover:border-pink-300 hover:shadow-lg transition-all group">
                        <div className="w-full h-32 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-4xl">❤️</span>
                        </div>
                        <h3 className="font-lato font-semibold text-forest-green mb-2 group-hover:text-pink-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="font-nunito font-bold text-xl text-pink-600 mb-3">${item.price}</p>
                        <Link to={`/product/${item.id}`}>
                          <button className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-lato font-semibold hover:from-pink-600 hover:to-pink-700 transition-all">
                            View Product
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">❤️</span>
                    </div>
                    <p className="font-lato text-earth-brown text-lg mb-2">Your wishlist is empty</p>
                    <p className="font-lato text-sm text-earth-brown mb-4">Add products you love to your wishlist</p>
                    <Link to="/shop">
                      <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-lato font-semibold hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg">
                        Browse Products
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Enhanced Recent Activities Section */}
          {activeSection === 'activities' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6">
                <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">Recent Activities</h2>
                <p className="font-lato text-indigo-100 text-sm">Your account activity timeline</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-5 border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50 to-transparent rounded-lg hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-lato font-semibold text-forest-green mb-1">{activity.action}</p>
                        <p className="font-lato text-sm text-earth-brown">{activity.details}</p>
                        <p className="font-lato text-xs text-earth-brown mt-1">{activity.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-lato capitalize ${
                        activity.type === 'order' ? 'bg-blue-100 text-blue-800' :
                        activity.type === 'wishlist' ? 'bg-pink-100 text-pink-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Support Section */}
          {activeSection === 'support' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
                  <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                    Support / Help Center
                  </h2>
                  <p className="font-lato text-teal-100 text-sm">We're here to help you</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full mx-auto">
                    <div className="p-6 border-2 border-mountain-gray rounded-xl hover:border-teal-300 hover:shadow-lg transition-all bg-gradient-to-br from-teal-50 to-white">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                        📞
                      </div>
                      <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-2">Contact Support</h3>
                      <p className="font-lato text-earth-brown mb-4">Get help from our support team</p>
                      <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-lato font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md">
                        Contact Us
                      </button>
                    </div>
                    <div className="p-6 border-2 border-mountain-gray rounded-xl hover:border-teal-300 hover:shadow-lg transition-all bg-gradient-to-br from-teal-50 to-white">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                        ❓
                      </div>
                      <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-2">FAQ</h3>
                      <p className="font-lato text-earth-brown mb-4">Find answers to common questions</p>
                      <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-lato font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md">
                        View FAQ
                      </button>
                    </div>
                    <div className="p-6 border-2 border-mountain-gray rounded-xl hover:border-teal-300 hover:shadow-lg transition-all bg-gradient-to-br from-teal-50 to-white">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                        📧
                      </div>
                      <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-2">Email Support</h3>
                      <p className="font-lato text-earth-brown mb-4">support@sportsequip.com</p>
                      <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-lato font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md">
                        Send Email
                      </button>
                    </div>
                    <div className="p-6 border-2 border-mountain-gray rounded-xl hover:border-teal-300 hover:shadow-lg transition-all bg-gradient-to-br from-teal-50 to-white">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                        💬
                      </div>
                      <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-2">Live Chat</h3>
                      <p className="font-lato text-earth-brown mb-4">Chat with us in real-time</p>
                      <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-lato font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md">
                        Start Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
