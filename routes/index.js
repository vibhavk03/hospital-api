const express = require('express');
const router = express.Router();

const doctorsRouter = require('./doctorsRouter');
const patientsRouter = require('./patientsRouter');
const reportsRouter = require('./reportsRouter');

router.use('/doctors', doctorsRouter);
router.use('/patients', patientsRouter);
router.use('/reports', reportsRouter);

module.exports = router;
