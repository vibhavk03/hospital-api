const express = require('express');
const router = express.Router();

const reportsController = require('../controller/reportsController');
const { requireDoctor } = require('../middleware/authMiddleware');

router.get('/:status', requireDoctor, reportsController.getReports);

module.exports = router;
