const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const roleAuth = require('../middleware/roleAuth');
const { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');

router.get('/', getMenuItems);
router.post('/', auth, roleAuth(['Admin']), createMenuItem);
router.put('/:id', auth, roleAuth(['Admin']), updateMenuItem);
router.delete('/:id', auth, roleAuth(['Admin']), deleteMenuItem);

module.exports = router;
