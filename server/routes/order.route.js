const express = require('express');
const router = express.Router();
const order = require('../controllers/order.controller');
const validateToken = require('../middlewares/validateToken');

//Clerk get info of all orders
router.get('/order', validateToken, order.getOrder)
router.get('/cook', validateToken, order.getCook)
router.get('/shipper', validateToken, order.getOrderShipper)
router.get('/orderbyemail', validateToken, order.getOrderbyemail)

module.exports = router;