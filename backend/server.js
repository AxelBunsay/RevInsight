require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes/admin');
const productRoutes = require('./routes/adminRoutes/product');

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(express.static('uploads'));


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})