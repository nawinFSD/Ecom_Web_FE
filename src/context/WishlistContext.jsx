import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load from localStorage on initialization
  useEffect(() => {
    const saved = localStorage.getItem('ecom_wishlist');
    if (saved) {
      try {
        setWishlistItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse wishlist from LocalStorage:', e);
      }
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('ecom_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);
      if (exists) {
        // Remove from wishlist
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        // Add to wishlist (store necessary keys for listing)
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            artist: product.artist,
            price: product.price,
            imageKey: product.imageKey,
            img: product.img, // fallback if home screen product
            medium: product.medium,
            outOfStock: product.outOfStock
          }
        ];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
