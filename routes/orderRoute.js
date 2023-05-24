const express = require('express');

const {
  createCashOrder,
  getAllOrders,
  getSpecificOrder,
  filterOrderForLoggedUser,
} = require('../services/orderService');

const authService = require('../services/authService');

const router = express.Router();

router.use(authService.protect);

router.post('/:cartId', createCashOrder);
router.get(
  '/',
  authService.allowedTo('user', 'admin'),
  filterOrderForLoggedUser,
  getAllOrders
);
router.get('/:id', getSpecificOrder);

module.exports = router;
