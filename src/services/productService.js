import productsJson from '../data/products.json';

const API_BASE_URL = 'http://localhost:5000/api/products';

const productService = {
  // Fetch all products
  getAllProducts: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch from API');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn('Backend products API offline or failed, falling back to static JSON catalog:', err.message);
      return productsJson;
    }
  },

  // Add a product (Admin only)
  addProduct: async (productData) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add product');
    }
    return data.product;
  },

  // Remove a product (Admin only)
  removeProduct: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/${productId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to remove product');
    }
    return data.product;
  },

  // Update a product (Admin only)
  updateProduct: async (productId, productData) => {
    const response = await fetch(`${API_BASE_URL}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update product');
    }
    return data.product;
  }
};

export default productService;
