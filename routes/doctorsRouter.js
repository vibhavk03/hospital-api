const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

const doctorsController = require('../controller/doctorsController');

router.post('/register', doctorsController.register);
router.post('/login', doctorsController.login);
/* route to check if logged in successfully */
router.get('/checkLogin', requireAuth, (req, res) => {
  res.status(200).json({ message: 'you are logged in' });
});
// router.delete('/delete/:id', doctorsController.delete);

module.exports = router;
