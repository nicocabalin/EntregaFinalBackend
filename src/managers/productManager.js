const Product = require('../models/productModel');

class ProductManager {
  static async getAllProducts(filter = {}, options = {}) {
    const defaultOptions = {
      page: 1,
      limit: 10,
      lean: true
    };
    const paginateOptions = { ...defaultOptions, ...options };
    return await Product.paginate(filter, paginateOptions);
  }

  static async getProductById(id) {
    return await Product.findById(id);
  }

  static async addProduct(productData) {
    return await Product.create(productData);
  }

  static async updateProduct(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  static async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = ProductManager;


