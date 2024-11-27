const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin routes
router.post('/login', adminController.login);
router.post('/signup', adminController.signup);

module.exports = router;