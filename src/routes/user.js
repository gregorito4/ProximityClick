const {Router} = require('express');
const router = Router();
const signInController = require('../controllers/sign_in.controller');
const getUserController = require('../controllers/get_user.controller');
const loginController = require('../controllers/login.controller');
const { createOrder, getOrders, updateOrder, getOrder } = require('../controllers/order.controller');


// Get the user logged in
router.route('/:id')
  .get(getUserController)

// Route to start using system
router.route('/log-in')
  .post(loginController)

// Route for register
router.route('/sign-in')
  .post(signInController)

// Routes to create orders
router.route('/orders/:id')
  .post(createOrder)

router.route('/:id/orders')
  .get(getOrders)

router.route('/:id/orders/:order_id')
  .put(updateOrder)
  .get(getOrder)

module.exports = router;
