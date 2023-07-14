const express = require('express');
const router = express.Router();

const doctorsRouter = require('./doctorsRouter');
const patientsRouter = require('./patientsRouter');
const reportsRouter = require('./reportsRouter');
const { checkUser } = require('../middleware/authMiddleware');

router.get('*', checkUser);

router.get('/health', function (req, res) {
  res.json({ 'health-check': 'green' });
});

router.use('/doctors', doctorsRouter);
// router.use('/patients', patientsRouter);
// router.use('/reports', reportsRouter);

module.exports = router;
