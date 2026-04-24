require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/admin', adminRoutes);

// sample
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})