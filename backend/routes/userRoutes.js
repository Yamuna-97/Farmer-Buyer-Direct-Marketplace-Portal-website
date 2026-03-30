const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');

// Public routes
router.post('/register', validateUser, userController.register);
router.post('/login', userController.login);

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUser);

module.exports = router;
