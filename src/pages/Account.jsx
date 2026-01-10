import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Account = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const result = updateProfile(formData);
    if (result.success) {
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-mountain-gray py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl text-forest-green mb-6 sm:mb-8 text-center sm:text-left">
            MY <span className="text-sunset-orange">ACCOUNT</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              <div className="bg-white glossy-card p-6 sm:p-8 min-h-[400px]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                  <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green">
                    Profile Information
                  </h2>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  )}
                </div>

                {message && (
                  <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md font-lato text-sm">
                    {message}
                  </div>
                )}

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                  {isEditing && (
                    <div className="flex gap-4">
                      <Button
                        variant="primary"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user.name,
                            email: user.email,
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order History */}
              <div className="bg-white glossy-card p-6 sm:p-8 min-h-[250px]">
                <h2 className="font-nunito font-extrabold text-xl sm:text-2xl text-forest-green mb-4">
                  Order History
                </h2>
                <p className="font-lato text-earth-brown">
                  No orders yet. Start shopping to see your order history here.
                </p>
                <div className="mt-4">
                  <Button
                    variant="primary"
                    onClick={() => navigate('/shop')}
                  >
                    Start Shopping
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6 order-1 lg:order-2">
              <div className="bg-white glossy-card p-6 sm:p-8 min-h-[200px]">
                <h3 className="font-nunito font-extrabold text-lg sm:text-xl text-forest-green mb-4">
                  Account Details
                </h3>
                <div className="space-y-3 font-lato text-sm">
                  <div>
                    <span className="text-earth-brown">Role:</span>{' '}
                    <span className="font-semibold text-forest-green capitalize">
                      {user.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-earth-brown">Member since:</span>{' '}
                    <span className="font-semibold text-forest-green">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {user.role === 'admin' && (
                <div className="bg-sunset-orange text-white glossy-card p-6 sm:p-8 min-h-[200px]">
                  <h3 className="font-nunito font-extrabold text-lg sm:text-xl mb-4">
                    Admin Access
                  </h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate('/admin')}
                  >
                    Go to Admin Dashboard
                  </Button>
                </div>
              )}

              <div className="bg-white glossy-card p-6 sm:p-8">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;

