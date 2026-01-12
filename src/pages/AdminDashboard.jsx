import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import productsData from '../data/products.json';

const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [activityLogs, setActivityLogs] = useState([]);
  const [revenueData] = useState([1200, 1900, 3000, 2500, 2800, 3200, 3500]);

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

    if (!isAdmin()) {
      navigate('/account');
      return;
    }

    // Load data
    const allUsers = JSON.parse(localStorage.getItem('sportsUsers') || '[]');
    const savedOrders = JSON.parse(localStorage.getItem('sportsOrders') || '[]');
    const allProducts = productsData;

    setUsers(allUsers);
    setOrders(savedOrders);
    setProducts(allProducts);

    setStats({
      totalUsers: allUsers.length,
      totalOrders: savedOrders.length,
      totalProducts: allProducts.length,
      totalRevenue: savedOrders.reduce((sum, order) => sum + (order.total || 0), 0),
    });

    // Generate activity logs
    const logs = [
      { id: 1, action: 'New order received', user: 'John Doe', time: '2 hours ago', type: 'order', icon: '🛒' },
      { id: 2, action: 'Product updated', user: 'Admin', time: '5 hours ago', type: 'product', icon: '📦' },
      { id: 3, action: 'New user registered', user: 'Jane Smith', time: '1 day ago', type: 'user', icon: '👤' },
      { id: 4, action: 'Order shipped', user: 'Admin', time: '2 days ago', type: 'order', icon: '🚚' },
      { id: 5, action: 'Inventory updated', user: 'Admin', time: '3 days ago', type: 'product', icon: '📊' },
    ];
    setActivityLogs(logs);
  }, [user, isAdmin, navigate]);

  const sidebarItems = [
    { id: 'stats', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Manage Users', icon: '👥' },
    { id: 'products', label: 'Manage Products', icon: '📦' },
    { id: 'orders', label: 'Manage Orders', icon: '🛒' },
    { id: 'logs', label: 'Activity Logs', icon: '📝' },
  ];

  const [activeSection, setActiveSection] = useState('stats');

  const maxRevenue = Math.max(...revenueData);
  const chartHeight = 200;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-mountain-gray flex">
      {/* Enhanced Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isDesktop ? 0 : (sidebarOpen ? 0 : -300) }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-forest-green to-green-800 text-white transform transition-transform duration-150 ease-in-out lg:translate-x-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Logo */}
          <div className="p-6 border-b border-green-700 bg-gradient-to-r from-green-800 to-green-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-sunset-orange rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h2 className="font-nunito font-extrabold text-xl text-white">
                    SPORTSEQUIP
                  </h2>
                  <p className="font-lato text-xs text-green-200">Admin Panel</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:text-green-200 transition-colors"
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
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-sunset-orange to-orange-500 text-white shadow-lg'
                    : 'hover:bg-green-700 text-gray-200 hover:shadow-md'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-lato font-semibold">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Enhanced User Info */}
          <div className="p-4 border-t border-green-700 bg-gradient-to-t from-green-800 to-transparent">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sunset-orange to-orange-600 flex items-center justify-center shadow-lg ring-2 ring-white ring-offset-2 ring-offset-green-800">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-green-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-lato font-semibold text-sm truncate text-white">{user?.name}</p>
                <p className="font-lato text-xs text-green-200 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/')}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 rounded-lg font-lato text-sm transition-all duration-200 shadow-md hover:shadow-lg"
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
                className="lg:hidden p-2 text-forest-green hover:bg-mountain-gray rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green">
                  {sidebarItems.find((item) => item.id === activeSection)?.label || 'Dashboard'}
                </h1>
                <p className="font-lato text-xs text-earth-brown hidden sm:block">
                  Welcome back, {user?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-mountain-gray rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-earth-brown mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-forest-green placeholder-earth-brown text-sm w-40"
                />
              </div>
              {/* Notifications */}
              <button className="relative p-2 text-forest-green hover:bg-mountain-gray rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gradient-to-br from-gray-50 to-mountain-gray">
          {/* Enhanced Stats Section */}
          {activeSection === 'stats' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Cards with Gradients */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-full mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">👥</span>
                    </div>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <h3 className="font-lato text-blue-100 text-sm mb-1">Total Users</h3>
                  <p className="font-nunito font-extrabold text-4xl">{stats.totalUsers}</p>
                  <p className="font-lato text-xs text-blue-100 mt-2">Active members</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🛒</span>
                    </div>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">+8%</span>
                  </div>
                  <h3 className="font-lato text-purple-100 text-sm mb-1">Total Orders</h3>
                  <p className="font-nunito font-extrabold text-4xl">{stats.totalOrders}</p>
                  <p className="font-lato text-xs text-purple-100 mt-2">This month</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">+5%</span>
                  </div>
                  <h3 className="font-lato text-green-100 text-sm mb-1">Total Products</h3>
                  <p className="font-nunito font-extrabold text-4xl">{stats.totalProducts}</p>
                  <p className="font-lato text-xs text-green-100 mt-2">In catalog</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-orange-500 to-sunset-orange text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">+23%</span>
                  </div>
                  <h3 className="font-lato text-orange-100 text-sm mb-1">Total Revenue</h3>
                  <p className="font-nunito font-extrabold text-4xl">${stats.totalRevenue.toFixed(0)}</p>
                  <p className="font-lato text-xs text-orange-100 mt-2">All time</p>
                </motion.div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-nunito font-extrabold text-2xl text-forest-green">Revenue Overview</h2>
                  <select className="px-4 py-2 border border-mountain-gray rounded-lg font-lato text-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
                <div className="relative h-64">
                  <svg className="w-full h-full" viewBox={`0 0 ${revenueData.length * 60} ${chartHeight}`}>
                    {revenueData.map((value, index) => {
                      const x = index * 60 + 30;
                      const y = chartHeight - (value / maxRevenue) * (chartHeight - 40) - 20;
                      const nextX = (index + 1) * 60 + 30;
                      const nextY = index < revenueData.length - 1 
                        ? chartHeight - (revenueData[index + 1] / maxRevenue) * (chartHeight - 40) - 20
                        : y;
                      return (
                        <g key={index}>
                          <line
                            x1={x}
                            y1={y}
                            x2={nextX}
                            y2={nextY}
                            stroke="url(#gradient)"
                            strokeWidth="3"
                            fill="none"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="6"
                            fill="#FF8A34"
                            className="hover:r-8 transition-all"
                          />
                        </g>
                      );
                    })}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF8A34" />
                        <stop offset="100%" stopColor="#FF6B1A" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-earth-brown font-lato px-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <span key={i}>{day}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order, index) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-mountain-gray rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-lato font-semibold text-forest-green text-sm">Order #{order.id}</p>
                            <p className="font-lato text-xs text-earth-brown">{order.email}</p>
                          </div>
                        </div>
                        <p className="font-nunito font-bold text-sunset-orange">${order.total?.toFixed(2) || '0.00'}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="font-nunito font-extrabold text-lg text-forest-green mb-4">New Users</h3>
                  <div className="space-y-3">
                    {users.slice(0, 3).map((u, index) => (
                      <div key={u.id} className="flex items-center justify-between p-3 bg-mountain-gray rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-lato font-semibold text-forest-green text-sm">{u.name}</p>
                            <p className="font-lato text-xs text-earth-brown">{u.email}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-sunset-orange text-white rounded text-xs font-lato capitalize">
                          {u.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Manage Users Section */}
          {activeSection === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-forest-green to-green-700 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                      Manage Users ({users.length})
                    </h2>
                    <p className="font-lato text-green-100 text-sm">View and manage all user accounts</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-forest-green rounded-xl font-lato font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl">
                    + Add User
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-mountain-gray">
                      <tr>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-forest-green">User</th>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-forest-green">Email</th>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-forest-green">Role</th>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-forest-green">Status</th>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-forest-green">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-mountain-gray">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-mountain-gray transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {u.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-lato font-semibold text-forest-green">{u.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-lato text-earth-brown">{u.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-lato capitalize ${
                              u.role === 'admin' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-lato">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-sunset-orange text-white rounded-lg text-sm font-lato hover:bg-orange-600 transition-colors">
                                Edit
                              </button>
                              <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-lato hover:bg-red-600 transition-colors">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Manage Products Section */}
          {activeSection === 'products' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                      Manage Products ({products.length})
                    </h2>
                    <p className="font-lato text-green-100 text-sm">View and manage product inventory</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-lato font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl">
                    + Add Product
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto">
                  {products.slice(0, 9).map((product) => (
                    <div key={product.id} className="border-2 border-mountain-gray rounded-xl p-4 hover:border-sunset-orange hover:shadow-lg transition-all group">
                      <div className="w-full h-32 bg-gradient-to-br from-mountain-gray to-gray-300 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-4xl">📦</span>
                      </div>
                      <h3 className="font-lato font-semibold text-forest-green mb-2 group-hover:text-sunset-orange transition-colors">
                        {product.name}
                      </h3>
                      <p className="font-nunito font-bold text-xl text-sunset-orange mb-3">${product.price}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-forest-green to-green-700 text-white rounded-lg text-sm font-lato hover:from-green-700 hover:to-green-600 transition-all">
                          Edit
                        </button>
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-lato hover:from-red-600 hover:to-red-700 transition-all">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Manage Orders Section */}
          {activeSection === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
                <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                  Manage Orders ({orders.length})
                </h2>
                <p className="font-lato text-purple-100 text-sm">Track and manage all orders</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="border-2 border-mountain-gray rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition-all">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                              #{order.id.slice(-3)}
                            </div>
                            <div>
                              <p className="font-lato font-semibold text-forest-green">Order #{order.id}</p>
                              <p className="font-lato text-sm text-earth-brown">{order.email}</p>
                              <p className="font-lato text-xs text-earth-brown mt-1">
                                {order.date || 'No date'} • {order.items?.length || 0} items
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-nunito font-bold text-2xl text-sunset-orange">
                                ${order.total?.toFixed(2) || '0.00'}
                              </p>
                              <p className="font-lato text-xs text-earth-brown">Total</p>
                            </div>
                            <select className="px-4 py-2 border-2 border-mountain-gray rounded-lg font-lato text-sm focus:border-purple-500 focus:outline-none">
                              <option>Pending</option>
                              <option>Processing</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-mountain-gray rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">🛒</span>
                      </div>
                      <p className="font-lato text-earth-brown text-lg">No orders yet</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Activity Logs Section */}
          {activeSection === 'logs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-orange-500 to-sunset-orange p-6">
                <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">Activity Logs</h2>
                <p className="font-lato text-orange-100 text-sm">Recent system activities and events</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activityLogs.map((log, index) => (
                    <div key={log.id} className="flex items-start gap-4 p-4 border-l-4 border-sunset-orange bg-gradient-to-r from-orange-50 to-transparent rounded-lg hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-gradient-to-br from-sunset-orange to-orange-600 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                        {log.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-lato font-semibold text-forest-green mb-1">{log.action}</p>
                        <p className="font-lato text-sm text-earth-brown">
                          {log.user} • {log.time}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-lato capitalize ${
                        log.type === 'order' ? 'bg-purple-100 text-purple-800' :
                        log.type === 'product' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
