const mongoose = require('.../server');

const Product = require('../models/productModel');

const products = [
  {
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 19.99,
    thumbnail: "",
    code: "P001",
    stock: 100,
    category: "Categoría A"
  },
  {
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 29.99,
    thumbnail: "",
    code: "P002",
    stock: 50,
    category: "Categoría B"
  },
];

async function seedDatabase() {
  try {
    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating the database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
