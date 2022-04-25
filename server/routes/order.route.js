const express = require('express');
const router = express.Router();
const order = require('../controllers/order.controller');
const validateToken = require('../middlewares/validateToken');

//Clerk get info of all orders
router.get('/order', validateToken, order.getOrder)

module.exports = router;