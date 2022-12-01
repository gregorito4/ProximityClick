const Order = require('../model/Order');
const User = require('../model/User');
const orderController = {};

// Function index/Get all orders
orderController.getOrders = async (req, res) => {
  const user = await User.findById(req.params.id).populate('orders');
  if (user.orders) {
    return res.json({
      message: 'Orders found',
      orders: user.orders
    })
  }
}

// Function create
orderController.createOrder = async (req, res) => {
  const { date, hour, width, hight, large, weight, quantity,
    senderAddress, senderCity, senderPhone, senderCellPhone,
    targetAddress, targetCity, receiverPhone } = req.body;

  const newOrder = new Order({
    date: date, hour: hour, width: width, weight: weight,
    large: large, hight: hight, quantity: quantity,
    senderAddress: senderAddress, senderCity: senderCity,
    senderPhone: senderPhone, senderCellPhone: senderCellPhone,
    targetAddress: targetAddress,
    targetCity: targetCity, receiverPhone: receiverPhone
  });

  newOrder.status = 'Created';

  const user = await User.findById(req.params.id)
  newOrder.user = user;
  await newOrder.save();
  user.orders.push(newOrder);
  await user.save();

  res.json({
    message: 'Order has been created',
    newOrder
  });
}

// Function get one
orderController.getOrder = async(req, res)=>{
  const order = await Order.findById(req.params.order_id);
  res.json(order)
}

// Function update order
orderController.updateOrder = async(req, res)=>{
  const { date, hour, width, large, hight, weight, quantity,
    senderAddress, senderCity, senderPhone, senderCellPhone,
    targetAddress, targetCity, receiverPhone } = req.body;

  const order = await Order.findByIdAndUpdate(req.params.order_id, {
    date, hour, width, hight, weight, large, quantity,
    senderAddress, senderCity, senderPhone, senderCellPhone,
    targetAddress, targetCity, receiverPhone
  });

  res.json({
    message: 'Order was successfully updated',
    order
  })
}

module.exports = orderController;
