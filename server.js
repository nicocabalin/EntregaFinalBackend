const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const productsRouter = require('./src/routes/products');
const cartsRouter = require('./src/routes/carts');
const viewsRouter = require('./src/routes/views');

const app = express();
const PORT = 8080;

// Connectar a MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Configurar Handlebars
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' }); 
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));