import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  // Load wishlist from localStorage on mount or when user changes
  useEffect(() => {
    if (user) {
      // Check if there's a guest wishlist to migrate
      const guestWishlist = localStorage.getItem('sportsWishlist_guest');
      const userWishlist = localStorage.getItem(`sportsWishlist_${user.id}`);
      
      if (guestWishlist && !userWishlist) {
        // First time login - migrate guest wishlist
        const guestItems = JSON.parse(guestWishlist);
        setWishlist(guestItems);
        localStorage.setItem(`sportsWishlist_${user.id}`, guestWishlist);
        localStorage.removeItem('sportsWishlist_guest');
      } else if (guestWishlist && userWishlist) {
        // Merge guest and user wishlists
        const guestItems = JSON.parse(guestWishlist);
        const userItems = JSON.parse(userWishlist);
        const mergedWishlist = [...userItems];
        guestItems.forEach((item) => {
          if (!mergedWishlist.find((w) => w.id === item.id)) {
            mergedWishlist.push(item);
          }
        });
        setWishlist(mergedWishlist);
        localStorage.setItem(`sportsWishlist_${user.id}`, JSON.stringify(mergedWishlist));
        localStorage.removeItem('sportsWishlist_guest');
      } else if (userWishlist) {
        // Load existing user wishlist
        setWishlist(JSON.parse(userWishlist));
      } else {
        setWishlist([]);
      }
    } else {
      // Load guest wishlist
      const guestWishlist = localStorage.getItem('sportsWishlist_guest');
      if (guestWishlist) {
        setWishlist(JSON.parse(guestWishlist));
      } else {
        setWishlist([]);
      }
    }
  }, [user]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`sportsWishlist_${user.id}`, JSON.stringify(wishlist));
    } else {
      localStorage.setItem('sportsWishlist_guest', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.id === product.id);
      if (exists) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    getWishlistCount,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

