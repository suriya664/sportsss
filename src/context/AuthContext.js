import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sportsUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('sportsUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('sportsUser');
    }
  }, [user]);

  const login = (email, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('sportsUsers') || '[]');
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role || 'user',
      };
      setUser(userData);
      return { success: true, user: userData };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('sportsUsers') || '[]');

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, this should be hashed
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('sportsUsers', JSON.stringify(users));

    // Auto-login after registration
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
    setUser(userData);

    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const users = JSON.parse(localStorage.getItem('sportsUsers') || '[]');
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      localStorage.setItem('sportsUsers', JSON.stringify(users));

      const updatedUser = {
        ...user,
        ...updatedData,
      };
      setUser(updatedUser);
      return { success: true };
    }

    return { success: false, error: 'User not found' };
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAdmin,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

