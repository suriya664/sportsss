import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import productsData from '../data/products.json';

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [inventoryAlerts, setInventoryAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);

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

    // Load orders
    const savedOrders = JSON.parse(localStorage.getItem('sportsOrders') || '[]');
    setPendingOrders(savedOrders.filter((order) => order.status === 'pending' || !order.status));

    // Load products with stock info
    const allProducts = productsData.map((p) => ({
      ...p,
      stock: Math.floor(Math.random() * 50) + 1, // Simulated stock
    }));
    setProducts(allProducts);

    // Generate inventory alerts
    const alerts = allProducts
      .filter((p) => p.stock < 10)
      .map((p) => ({
        id: p.id,
        product: p.name,
        stock: p.stock,
        severity: p.stock < 5 ? 'critical' : 'warning',
      }));
    setInventoryAlerts(alerts);

    // Generate notifications
    const notifs = [
      { id: 1, message: 'New order #1234 requires processing', time: '5 min ago', type: 'order', icon: '🛒' },
      { id: 2, message: 'Low stock alert: Football', time: '1 hour ago', type: 'inventory', icon: '⚠️' },
      { id: 3, message: 'Shipment #5678 delivered', time: '2 hours ago', type: 'delivery', icon: '🚚' },
      { id: 4, message: 'New shipment ready for pickup', time: '3 hours ago', type: 'delivery', icon: '📦' },
    ];
    setNotifications(notifs);
  }, [user, navigate]);

  const sidebarItems = [
    { id: 'orders', label: 'Pending Orders', icon: '📋' },
    { id: 'inventory', label: 'Stock Management', icon: '📦' },
    { id: 'alerts', label: 'Inventory Alerts', icon: '⚠️' },
    { id: 'shipments', label: 'Shipments', icon: '🚚' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ];

  const [activeSection, setActiveSection] = useState('orders');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-mountain-gray flex">
      {/* Enhanced Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isDesktop ? 0 : (sidebarOpen ? 0 : -300) }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-blue-600 to-blue-700 text-white transform transition-transform duration-150 ease-in-out lg:translate-x-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Logo */}
          <div className="p-6 border-b border-blue-500 bg-gradient-to-r from-blue-700 to-blue-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h2 className="font-nunito font-extrabold text-xl text-white">
                    SPORTSEQUIP
                  </h2>
                  <p className="font-lato text-xs text-blue-200">Staff Panel</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:text-blue-200 transition-colors"
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
                    ? 'bg-white text-blue-700 shadow-lg'
                    : 'hover:bg-blue-600 text-blue-100 hover:shadow-md'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-lato font-semibold">{item.label}</span>
                {item.id === 'alerts' && inventoryAlerts.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold">
                    {inventoryAlerts.length}
                  </span>
                )}
                {item.id === 'notifications' && notifications.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold">
                    {notifications.length}
                  </span>
                )}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-2 h-2 bg-blue-700 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Enhanced User Info */}
          <div className="p-4 border-t border-blue-500 bg-gradient-to-t from-blue-700 to-transparent">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg ring-2 ring-white ring-offset-2 ring-offset-blue-700">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-blue-700"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-lato font-semibold text-sm truncate text-white">{user?.name}</p>
                <p className="font-lato text-xs text-blue-200 truncate">{user?.email}</p>
              </div>
            </div>
            <h3 className="font-lato font-semibold text-sm mb-3 text-blue-200">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-lato text-sm transition-all shadow-md hover:shadow-lg text-left flex items-center space-x-2">
                <span>📦</span>
                <span>Add Stock</span>
              </button>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-lato text-sm transition-all shadow-md hover:shadow-lg text-left flex items-center space-x-2">
                <span>📊</span>
                <span>Generate Report</span>
              </button>
            </div>
            <div className="space-y-2 mt-3">
              <button
                onClick={() => navigate('/')}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-lato text-sm transition-all shadow-md hover:shadow-lg"
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
                className="lg:hidden p-2 text-blue-600 hover:bg-mountain-gray rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="font-nunito font-extrabold text-xl sm:text-2xl text-blue-700">
                  {sidebarItems.find((item) => item.id === activeSection)?.label || 'Dashboard'}
                </h1>
                <p className="font-lato text-xs text-earth-brown hidden sm:block">
                  Operations dashboard
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
                  className="bg-transparent border-none outline-none text-blue-700 placeholder-earth-brown text-sm w-40"
                />
              </div>
              <button className="relative p-2 text-blue-600 hover:bg-mountain-gray rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gradient-to-br from-gray-50 to-mountain-gray">
          {/* Enhanced Pending Orders Section */}
          {activeSection === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-full mx-auto">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📋</span>
                    </div>
                  </div>
                  <h3 className="font-lato text-yellow-100 text-sm mb-1">Pending Orders</h3>
                  <p className="font-nunito font-extrabold text-4xl">{pendingOrders.length}</p>
                  <p className="font-lato text-xs text-yellow-100 mt-2">Require attention</p>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>
                  </div>
                  <h3 className="font-lato text-blue-100 text-sm mb-1">Total Products</h3>
                  <p className="font-nunito font-extrabold text-4xl">{products.length}</p>
                  <p className="font-lato text-xs text-blue-100 mt-2">In inventory</p>
                </div>
                <div className="bg-gradient-to-br from-red-400 to-red-500 text-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">⚠️</span>
                    </div>
                  </div>
                  <h3 className="font-lato text-red-100 text-sm mb-1">Low Stock Alerts</h3>
                  <p className="font-nunito font-extrabold text-4xl">{inventoryAlerts.length}</p>
                  <p className="font-lato text-xs text-red-100 mt-2">Need restocking</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                        Pending Orders ({pendingOrders.length})
                      </h2>
                      <p className="font-lato text-yellow-100 text-sm">Orders awaiting processing</p>
                    </div>
                    <button className="px-6 py-3 bg-white text-yellow-600 rounded-xl font-lato font-semibold hover:bg-yellow-50 transition-all shadow-lg hover:shadow-xl">
                      Process All
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {pendingOrders.length > 0 ? (
                      pendingOrders.map((order, index) => (
                        <div key={order.id} className="border-2 border-mountain-gray rounded-xl p-5 hover:border-yellow-300 hover:shadow-md transition-all">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4 flex-1">
                              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-white font-bold">
                                #{index + 1}
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <p className="font-lato font-semibold text-forest-green">Order #{order.id}</p>
                                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-lato font-semibold">
                                    Pending
                                  </span>
                                </div>
                                <p className="font-lato text-sm text-earth-brown">{order.email}</p>
                                <p className="font-lato text-sm text-earth-brown mt-1">
                                  Items: {order.items?.length || 0} • Total: ${order.total?.toFixed(2) || '0.00'}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-lato font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md">
                                Process
                              </button>
                              <button className="px-5 py-2 bg-mountain-gray text-forest-green rounded-lg font-lato font-semibold hover:bg-gray-300 transition-all">
                                View
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 bg-mountain-gray rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-4xl">✅</span>
                        </div>
                        <p className="font-lato text-earth-brown text-lg">No pending orders</p>
                        <p className="font-lato text-sm text-earth-brown mt-2">All orders have been processed</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Stock Management Section */}
          {activeSection === 'inventory' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                      Product Stock Management
                    </h2>
                    <p className="font-lato text-blue-100 text-sm">Monitor and update inventory levels</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-lato font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
                    Update Stock
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <tr>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-blue-900">Product</th>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-blue-900">Category</th>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-blue-900">Stock</th>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-blue-900">Status</th>
                        <th className="px-6 py-4 text-left font-lato font-semibold text-blue-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-mountain-gray">
                      {products.slice(0, 15).map((product) => (
                        <tr key={product.id} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                {product.name.charAt(0)}
                              </div>
                              <span className="font-lato font-semibold text-forest-green">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-lato text-earth-brown capitalize">{product.category}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-lato font-bold text-lg text-forest-green">{product.stock}</span>
                              <span className="text-xs text-earth-brown">units</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {product.stock < 10 ? (
                              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-lato font-semibold">
                                Low Stock
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-lato font-semibold">
                                In Stock
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-lato hover:from-blue-600 hover:to-blue-700 transition-all">
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Inventory Alerts Section */}
          {activeSection === 'alerts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                  <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                    Inventory Alerts ({inventoryAlerts.length})
                  </h2>
                  <p className="font-lato text-red-100 text-sm">Products requiring immediate attention</p>
                </div>
                <div className="p-6">
                  {inventoryAlerts.length > 0 ? (
                    <div className="space-y-4">
                      {inventoryAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-5 rounded-xl border-l-4 shadow-md ${
                            alert.severity === 'critical'
                              ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-500'
                              : 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                                alert.severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                              }`}>
                                ⚠️
                              </div>
                              <div>
                                <p className="font-lato font-semibold text-forest-green text-lg">{alert.product}</p>
                                <p className="font-lato text-sm text-earth-brown mt-1">
                                  Only <span className="font-bold text-red-600">{alert.stock}</span> units remaining
                                </p>
                              </div>
                            </div>
                            <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-lato font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg">
                              Restock Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">✅</span>
                      </div>
                      <p className="font-lato text-earth-brown text-lg">No inventory alerts</p>
                      <p className="font-lato text-sm text-earth-brown mt-2">All products are well stocked</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Shipments Section */}
          {activeSection === 'shipments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6">
                <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                  Shipment / Delivery Status
                </h2>
                <p className="font-lato text-indigo-100 text-sm">Track all shipments and deliveries</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { id: 'SHP001', order: '#1234', status: 'In Transit', destination: 'New York, NY', eta: '2 days', progress: 60 },
                    { id: 'SHP002', order: '#1235', status: 'Out for Delivery', destination: 'Los Angeles, CA', eta: 'Today', progress: 90 },
                    { id: 'SHP003', order: '#1236', status: 'Delivered', destination: 'Chicago, IL', eta: 'Completed', progress: 100 },
                  ].map((shipment) => (
                    <div key={shipment.id} className="border-2 border-mountain-gray rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                            🚚
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-lato font-semibold text-forest-green">Shipment {shipment.id}</p>
                              <span className={`px-3 py-1 rounded-full text-xs font-lato font-semibold ${
                                shipment.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : shipment.status === 'Out for Delivery'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {shipment.status}
                              </span>
                            </div>
                            <p className="font-lato text-sm text-earth-brown">Order: {shipment.order}</p>
                            <p className="font-lato text-sm text-earth-brown">Destination: {shipment.destination}</p>
                            <p className="font-lato text-sm text-earth-brown mt-1">ETA: {shipment.eta}</p>
                            <div className="mt-2 w-full bg-mountain-gray rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  shipment.progress === 100 ? 'bg-green-500' :
                                  shipment.progress >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                                }`}
                                style={{ width: `${shipment.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-lato font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md">
                          Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Notifications Section */}
          {activeSection === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-nunito font-extrabold text-2xl text-white mb-1">
                      Notifications ({notifications.length})
                    </h2>
                    <p className="font-lato text-purple-100 text-sm">Stay updated with latest activities</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-lato font-semibold hover:bg-purple-50 transition-all shadow-lg">
                    Mark All Read
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-4 p-5 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-transparent rounded-lg hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                        {notif.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-lato font-semibold text-forest-green mb-1">{notif.message}</p>
                        <p className="font-lato text-sm text-earth-brown">{notif.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-lato capitalize ${
                        notif.type === 'order' ? 'bg-yellow-100 text-yellow-800' :
                        notif.type === 'inventory' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notif.type}
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

export default StaffDashboard;
