const express = require('express');
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart
} = require('../../controllers/userControllers/cartController');

router.post('/add', addToCart);
router.get('/:customerPhone', getCart);
router.delete('/remove/:customerPhone/:productId', removeFromCart);
router.put('/update/:customerPhone/:productId', updateCartQuantity);
router.delete('/clear/:customerPhone', clearCart);

module.exports = router;