const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authenticate } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile
} = require('../middleware/validate');

// Public routes
router.post('/register', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);

// Protected routes
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, validateUpdateProfile, userController.updateProfile);
router.get('/purchase-history', authenticate, userController.getPurchaseHistory);
router.get('/receipts', authenticate, userController.getReceipts);

module.exports = router;