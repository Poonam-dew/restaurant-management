const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const roleAuth = require('../middleware/roleAuth');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/OrderController');

// Create an order (Customer)
router.post('/', auth, roleAuth(['Customer']), createOrder);

// Get all orders (Admin/Waiter)
router.get('/', auth, roleAuth(['Admin', 'Waiter']), getOrders);

// Update order status (Admin/Waiter)
router.put('/:id', auth, roleAuth(['Admin', 'Waiter']), updateOrderStatus);

module.exports = router;
