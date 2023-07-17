const express = require('express');
const router = express.Router();

const patientsController = require('../controller/patientsController');
const { requireDoctor } = require('../middleware/authMiddleware');

router.post('/register', requireDoctor, patientsController.register);
router.post(
  '/:id/create_report',
  requireDoctor,
  patientsController.createReport
);
router.get('/:id/all_reports', requireDoctor, patientsController.allReports);
router.delete('/:id/delete', requireDoctor, patientsController.delete);

module.exports = router;
