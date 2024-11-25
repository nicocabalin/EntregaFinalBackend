const Cart = require('../models/cartModel');

class CartManager {
  static async createCart() {
    return await Cart.create({ products: [] });
  }

  static async getCartById(cartId) {
    return await Cart.findById(cartId).populate('products.product');
  }

  static async addProductToCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  static async removeProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    return await cart.save();
  }

  static async updateCart(cartId, newProducts) {
    return await Cart.findByIdAndUpdate(cartId, { products: newProducts }, { new: true });
  }

  static async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
      return await cart.save();
    } else {
      throw new Error('Producto no encontrado en el carrito');
    }
  }

  static async clearCart(cartId) {
    const cart = await Cart.findById(cartId);
    cart.products = [];
    return await cart.save();
  }
}

module.exports = CartManager;