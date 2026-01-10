import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import UserDashboard from './pages/UserDashboard';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

// Initialize default admin user
const initializeAdmin = () => {
  const users = JSON.parse(localStorage.getItem('sportsUsers') || '[]');
  const adminExists = users.find((u) => u.role === 'admin');
  
  if (!adminExists) {
    const adminUser = {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@sportsequip.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    users.push(adminUser);
    localStorage.setItem('sportsUsers', JSON.stringify(users));
  }

  // Create demo user if doesn't exist
  const demoUserExists = users.find((u) => u.email === 'user@example.com');
  if (!demoUserExists) {
    const demoUser = {
      id: 'user-1',
      name: 'Demo User',
      email: 'user@example.com',
      password: 'user123',
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    users.push(demoUser);
    localStorage.setItem('sportsUsers', JSON.stringify(users));
  }
};

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');

  return (
            <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/success" element={<CheckoutSuccess />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/account"
                    element={
                      <ProtectedRoute>
                        <Account />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff-dashboard"
            element={
              <ProtectedRoute>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
      {!isDashboard && <Footer />}
            </div>
  );
}

function App() {
  useEffect(() => {
    initializeAdmin();
  }, []);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
