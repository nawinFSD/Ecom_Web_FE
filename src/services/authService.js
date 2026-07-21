const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = `${BASE_URL.replace(/\/$/, '')}/api/auth`;

const authService = {
  // Login method
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  },

  // Register method
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  },

  // Google Auth method
  googleAuth: async (credential) => {
    const response = await fetch(`${API_BASE_URL}/google-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ credential })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Google authentication failed');
    }
    return data;
  },

  // Update profile method
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/update-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Profile update failed');
    }
    return data;
  }
};

export default authService;
