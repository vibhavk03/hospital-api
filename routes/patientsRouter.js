const express = require('express');
const router = express.Router();

const patientsController = require('../controller/patientsController');
const { requireDoctor } = require('../middleware/authMiddleware');

router.post('/register', requireDoctor, patientsController.register);
// router.post('/create_report/:id', patientsController.createReport);
// router.get('/all_reports/:id', patientsController.getAllReports);
// router.delete('/delete/:id', patientsController.delete);

module.exports = router;
