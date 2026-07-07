import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Load user from localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem('ecom_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user from LocalStorage:', e);
        localStorage.removeItem('ecom_user');
      }
    }
    setAuthLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response && response.user) {
        setUser(response.user);
        localStorage.setItem('ecom_user', JSON.stringify(response.user));
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'Connection error' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response && response.user) {
        setUser(response.user);
        localStorage.setItem('ecom_user', JSON.stringify(response.user));
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message || 'Registration failed' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'Connection error' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecom_user');
    // Clear cart or redirect is handled at route levels
  };

  return (
    <UserContext.Provider value={{ user, authLoading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
