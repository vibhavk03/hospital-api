const express = require('express');
const router = express.Router();

const patientsController = require('../controller/patientsController');

router.post('/register', patientsController.register);
router.post('/:id/create_report', patientsController.createReport);
router.get('/:id/all_reports', patientsController.allReports);
router.delete('/:id/delete', patientsController.delete);

module.exports = router;
