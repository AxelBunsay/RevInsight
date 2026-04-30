const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers/user');
const { authenticate } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/authorize');
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile
} = require('../middleware/validate');

// Public routes
router.post('/register', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);

// Protected routes (user only)
router.get('/profile', authorizeRoles('user'), userController.getProfile);
router.put('/profile', authorizeRoles('user'), validateUpdateProfile, userController.updateProfile);
router.get('/purchase-history', authorizeRoles('user'), userController.getPurchaseHistory);
router.get('/receipts', authorizeRoles('user'), userController.getReceipts);

module.exports = router;