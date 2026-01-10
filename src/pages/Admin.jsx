import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import productsData from '../data/products.json';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: productsData.length,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!isAdmin()) {
      navigate('/account');
      return;
    }

    // Load users
    const allUsers = JSON.parse(localStorage.getItem('sportsUsers') || '[]');
    setUsers(allUsers);
    setStats((prev) => ({ ...prev, totalUsers: allUsers.length }));

    // Load orders (simulated)
    const savedOrders = JSON.parse(localStorage.getItem('sportsOrders') || '[]');
    setOrders(savedOrders);
    setStats((prev) => ({
      ...prev,
      totalOrders: savedOrders.length,
      totalRevenue: savedOrders.reduce((sum, order) => sum + (order.total || 0), 0),
    }));
  }, [user, isAdmin, navigate]);

  const handleCreateAdmin = () => {
    // Create default admin user if doesn't exist
    const allUsers = JSON.parse(localStorage.getItem('sportsUsers') || '[]');
    const adminExists = allUsers.find((u) => u.role === 'admin');

    if (!adminExists) {
      const adminUser = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@sportsequip.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      allUsers.push(adminUser);
      localStorage.setItem('sportsUsers', JSON.stringify(allUsers));
      alert('Default admin created: admin@sportsequip.com / admin123');
    } else {
      alert('Admin user already exists');
    }
  };

  return (
    <div className="min-h-screen bg-mountain-gray py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl lg:text-5xl text-forest-green text-center sm:text-left">
            ADMIN <span className="text-sunset-orange">DASHBOARD</span>
          </h1>
          <Button variant="outline" size="sm" onClick={() => navigate('/account')} className="w-full sm:w-auto">
            Back to Account
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white glossy-card p-6"
          >
            <h3 className="font-lato text-earth-brown text-sm mb-2">Total Users</h3>
            <p className="font-nunito font-extrabold text-3xl text-forest-green">
              {stats.totalUsers}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white glossy-card p-6"
          >
            <h3 className="font-lato text-earth-brown text-sm mb-2">Total Orders</h3>
            <p className="font-nunito font-extrabold text-3xl text-sunset-orange">
              {stats.totalOrders}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white glossy-card p-6"
          >
            <h3 className="font-lato text-earth-brown text-sm mb-2">Total Revenue</h3>
            <p className="font-nunito font-extrabold text-3xl text-forest-green">
              ${stats.totalRevenue.toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white glossy-card p-6"
          >
            <h3 className="font-lato text-earth-brown text-sm mb-2">Total Products</h3>
            <p className="font-nunito font-extrabold text-3xl text-sunset-orange">
              {stats.totalProducts}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Users List */}
          <div className="bg-white glossy-card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green">
                Users ({users.length})
              </h2>
              <Button variant="outline" size="sm" onClick={handleCreateAdmin} className="w-full sm:w-auto">
                Create Admin
              </Button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="p-3 border border-mountain-gray rounded-md flex items-center justify-between"
                >
                  <div>
                    <p className="font-lato font-semibold text-forest-green">
                      {u.name}
                    </p>
                    <p className="font-lato text-sm text-earth-brown">{u.email}</p>
                  </div>
                  <span className="font-lato text-xs px-2 py-1 bg-sunset-orange text-white rounded-md capitalize">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white glossy-card p-4 sm:p-6">
            <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4 sm:mb-6">
              Recent Orders ({orders.length})
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 border border-mountain-gray rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-lato font-semibold text-forest-green">
                          Order #{order.id}
                        </p>
                        <p className="font-lato text-sm text-earth-brown">
                          {order.email}
                        </p>
                      </div>
                      <p className="font-nunito font-bold text-sunset-orange">
                        ${order.total?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-lato text-earth-brown text-center py-8">
                  No orders yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

