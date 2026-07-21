const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = `${BASE_URL.replace(/\/$/, '')}/api/cart`;

export const cartService = {
  // GET all cart items
  async getCart(userId = 'anonymous') {
    const response = await fetch(API_BASE_URL, {
      headers: {
        'user-id': userId
      }
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch cart');
    }
    return response.json();
  },

  // POST add item to cart
  async addToCart(product, quantity = 1, userId = 'anonymous') {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId
      },
      body: JSON.stringify({
        productId: product.id,
        title: product.title,
        artist: product.artist,
        price: product.price,
        imageKey: product.imageKey,
        quantity,
      }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to add item to cart');
    }
    return response.json();
  },

  // PUT update quantity
  async updateQuantity(productId, quantity, userId = 'anonymous') {
    const response = await fetch(`${API_BASE_URL}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to update quantity');
    }
    return response.json();
  },

  // DELETE a specific item
  async removeFromCart(productId, userId = 'anonymous') {
    const response = await fetch(`${API_BASE_URL}/${productId}`, {
      method: 'DELETE',
      headers: {
        'user-id': userId
      }
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to remove item from cart');
    }
    return response.json();
  },

  // DELETE clear all
  async clearCart(userId = 'anonymous') {
    const response = await fetch(API_BASE_URL, {
      method: 'DELETE',
      headers: {
        'user-id': userId
      }
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to clear cart');
    }
    return response.json();
  },
};
