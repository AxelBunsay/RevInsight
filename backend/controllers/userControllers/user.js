const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        preferences: user.preferences,
        totalPurchases: user.totalPurchases,
        totalSpent: user.totalSpent,
        firstPurchaseDate: user.firstPurchaseDate,
        lastPurchaseDate: user.lastPurchaseDate
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, profileImage, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName,
        lastName,
        phoneNumber,
        profileImage,
        preferences
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        preferences: user.preferences
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get purchase history
const getPurchaseHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      totalPurchases: user.totalPurchases,
      totalSpent: user.totalSpent,
      firstPurchaseDate: user.firstPurchaseDate,
      lastPurchaseDate: user.lastPurchaseDate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get receipts
const getReceipts = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // TODO: Fetch receipts from receipts collection/table
    res.status(200).json({
      message: 'Receipts retrieved',
      receipts: [],
      lastReceiptDate: user.lastReceiptDate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  getPurchaseHistory,
  getReceipts
};
