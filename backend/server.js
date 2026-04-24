require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/user');
const mechanicRoutes = require('./routes/mechanic');
const adminRoutes = require('./routes/admin');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


// Routes
app.use('/api/users', userRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/admins', adminRoutes);

// sample
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});