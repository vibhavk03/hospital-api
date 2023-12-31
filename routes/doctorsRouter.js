const express = require('express');
const router = express.Router();

/* require doctor is authentication middlware */
const { requireDoctor } = require('../middleware/authMiddleware');

const doctorsController = require('../controller/doctorsController');

router.post('/register', doctorsController.register);
router.post('/login', doctorsController.login);
router.get('/checkLogin', requireDoctor, doctorsController.checkLogin);
router.get('/logout', doctorsController.logout);
router.delete('/delete', requireDoctor, doctorsController.delete);

module.exports = router;
