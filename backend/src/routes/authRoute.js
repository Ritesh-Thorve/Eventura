const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const  userAuthMiddleware  = require('../middleware/userAuthMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', userAuthMiddleware, getProfile);
 
module.exports = router;
