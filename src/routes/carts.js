const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cartManager');

// POST 
router.post('/', async (req, res) => {
  try {
    const newCart = await CartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

// GET 
router.get('/:cid', async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.cid);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ status: 'error', error: error.message });
  }
});

// POST 
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await CartManager.addProductToCart(req.params.cid, req.params.pid, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

// DELETE 
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const updatedCart = await CartManager.removeProductFromCart(req.params.cid, req.params.pid);
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

// PUT 
router.put('/:cid', async (req, res) => {
  try {
    const updatedCart = await CartManager.updateCart(req.params.cid, req.body);
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

// PUT 
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await CartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

// DELETE 
router.delete('/:cid', async (req, res) => {
  try {
    await CartManager.clearCart(req.params.cid);
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

module.exports = router;

module.exports = router;