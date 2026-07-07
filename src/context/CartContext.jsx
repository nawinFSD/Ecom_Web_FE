import { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useUser } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const { user } = useUser();

  const userId = user ? user._id : 'anonymous';

  // Fetch cart data when userId changes
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsLoading(true);
        const data = await cartService.getCart(userId);
        setCartItems(data);
        setError(null);
        setUsingFallback(false);
      } catch (err) {
        console.warn('Backend Cart API is not available, falling back to LocalStorage.', err.message);
        setUsingFallback(true);
        const localData = localStorage.getItem('ecom_cart');
        if (localData) {
          setCartItems(JSON.parse(localData));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartData();
  }, [userId]);

  // Save to localStorage if using fallback
  useEffect(() => {
    if (usingFallback) {
      localStorage.setItem('ecom_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, usingFallback]);

  // Add Item to Cart
  const addToCart = async (product, quantity = 1) => {
    try {
      if (!usingFallback) {
        setIsLoading(true);
        const updatedItem = await cartService.addToCart(product, quantity, userId);
        
        // Sync state: if item exists in state, update quantity; else add it
        setCartItems((prevItems) => {
          const exists = prevItems.some((item) => item.productId === product.id);
          if (exists) {
            return prevItems.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            return [...prevItems, updatedItem];
          }
        });
        setError(null);
      } else {
        // LocalStorage Fallback
        setCartItems((prevItems) => {
          const exists = prevItems.some((item) => item.productId === product.id);
          if (exists) {
            return prevItems.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            return [
              ...prevItems,
              {
                productId: product.id,
                title: product.title,
                artist: product.artist,
                price: product.price,
                imageKey: product.imageKey,
                quantity,
              },
            ];
          }
        });
      }
    } catch (err) {
      console.error('Failed to add item to cart backend, retrying with fallback', err);
      setUsingFallback(true);
      addToCart(product, quantity); // recursive call to process in fallback mode
    } finally {
      setIsLoading(false);
    }
  };

  // Update Item Quantity
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      if (!usingFallback) {
        setIsLoading(true);
        await cartService.updateQuantity(productId, quantity, userId);
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
        );
        setError(null);
      } else {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (err) {
      console.error('Failed to update quantity backend, shifting to fallback', err);
      setUsingFallback(true);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Remove Item from Cart
  const removeFromCart = async (productId) => {
    try {
      if (!usingFallback) {
        setIsLoading(true);
        await cartService.removeFromCart(productId, userId);
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId !== productId)
        );
        setError(null);
      } else {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId !== productId)
        );
      }
    } catch (err) {
      console.error('Failed to remove item backend, shifting to fallback', err);
      setUsingFallback(true);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Clear Cart
  const clearCart = async () => {
    try {
      if (!usingFallback) {
        setIsLoading(true);
        await cartService.clearCart(userId);
        setCartItems([]);
        setError(null);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Failed to clear cart backend, shifting to fallback', err);
      setUsingFallback(true);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper values
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        error,
        usingFallback,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalQuantity,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
