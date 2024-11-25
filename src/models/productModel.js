const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
  category: String
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);

