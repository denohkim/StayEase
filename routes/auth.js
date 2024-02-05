const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Load the passport strategy
const passport = require('passport');

// Registration Page
router.get('/register', authController.registerPage);

// Handle Registration
router.post('/register', authController.register);

// Login Page
router.get('/login', authController.loginPage);

// Handle Login
router.post('/login', authController.login);

// Logout Handler
router.get('/logout', authController.logout);

module.exports = router;