const express = require('express');
const router = express.Router();

const reportsController = require('../controller/reportsController');

router.get('/:status', reportsController.getReports);

module.exports = router;
