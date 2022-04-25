const express = require('express');
const router = express.Router();
const validateAdmin = require('../middlewares/validateAdmin');
const admin = require('../controllers/admin.controller');
const category = require('../controllers/category.controller');

router.get('/admin/statistics', admin.getFilteredOrders);
router.get('/admin/employee', admin.getAllEmployee);
router.get('/admin/employee/email', admin.getCustomer);
router.put('/admin/employee/email', admin.putCustomer);

module.exports = router;