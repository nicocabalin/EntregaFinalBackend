const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');
const CartManager = require('../managers/cartManager');

// Ruta para la vista de productos
router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
    };
    const filter = query ? { category: query } : {};

    const result = await ProductManager.getAllProducts(filter, options);

    res.render('products', {
      products: result.docs,
      pagination: {
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
      },
      sort,
      query,
    });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});

// Ruta para la vista de un producto específico
router.get('/products/:pid', async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.pid);
    res.render('productDetail', { product });
  } catch (error) {
    res.status(404).render('error', { error: error.message });
  }
});

// Ruta para la vista de un carrito específico
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.cid);
    res.render('cart', { cart });
  } catch (error) {
    res.status(404).render('error', { error: error.message });
  }
});

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await ProductManager.getAllProducts();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});

module.exports = router;
module.exports = router;