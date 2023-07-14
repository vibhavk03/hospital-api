const express = require('express');
const router = express.Router();

const doctorsController = require('../controller/doctorsController');

router.post('/register', doctorsController.register);
router.post('/login', doctorsController.login);
// router.delete('/delete/:id', doctorsController.delete);

module.exports = router;
