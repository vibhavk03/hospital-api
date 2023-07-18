const express = require('express');
const router = express.Router();

const doctorsRouter = require('./doctorsRouter');
const patientsRouter = require('./patientsRouter');
const reportsRouter = require('./reportsRouter');

/* require doctor is authentication middlware */
const { requireDoctor } = require('../middleware/authMiddleware');

router.use('/doctors', doctorsRouter);
router.use('/patients', requireDoctor, patientsRouter);
router.use('/reports', requireDoctor, reportsRouter);

module.exports = router;
