const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    let totalPrice = 0;
    const itemDetails = [];

    for (let i of items) {
      const menuItem = await MenuItem.findById(i.menuItem);
      if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
      totalPrice += menuItem.price * i.quantity;
      itemDetails.push({ menuItem: menuItem._id, quantity: i.quantity });
    }

    const newOrder = new Order({
      user: req.user.id,
      items: itemDetails,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name').populate('items.menuItem', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
