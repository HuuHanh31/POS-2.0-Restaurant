const express = require('express');
const router = express.Router();

const validateToken = require('../middlewares/validateToken');
const profile = require('../controllers/profile.controller');

router.get('/profile',validateToken, profile.getProfile );
router.post('/profile',validateToken, profile.postProfile );

module.exports = router;