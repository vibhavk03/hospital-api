const Patient = require('../models/Patient');
const Report = require('../models/Report');

const handleErrorsForPatient = async function (err, body) {
  let errors = { name: '', age: '', sex: '', phone: '' };

  /* patient register error handling */
  /* handle duplicate phone number register */
  if (err.code === 11000) {
    /* if duplicate number return the patient by that number */
    const patient = await Patient.find({ phone: body.phone });
    return {
      patientFound: true,
      patient,
    };
  }
  if (err.message.includes('patient validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      const { message, path } = properties;
      errors[path] = message;
    });
  }

  return errors;
};

const handleErrorsForReport = function (err) {
  let errors = { patientId: '', status: '' };

  /* patient register error handling */
  if (err.message.includes('report validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      const { message, path } = properties;
      errors[path] = message;
    });
  }

  /* if patient id is not valid */
  if (err.message.includes('Cast to ObjectId failed')) {
    errors.patientId = 'invalid patient id';
  }

  return errors;
};

const handleErrorsForGetReports = function (err) {
  let errors = { patientId: '' };

  /* if patient id is not valid */
  if (err.message.includes('Cast to ObjectId failed')) {
    errors.patientId = 'invalid patient id';
  }

  return errors;
};

module.exports = {
  register: async function (req, res) {
    try {
      const patient = await Patient.create(req.body);
      res.status(201).send({
        message: 'patient registered',
        patient,
      });
    } catch (err) {
      console.log(`error in registering a patient : ${err}`);
      const error = await handleErrorsForPatient(err, req.body);
      if (error.patientFound) {
        res.status(200).json({
          message: 'patient already registered by this phone number',
          patient: error.patient[0],
        });
      } else {
        res.status(400).send({
          message: 'error in registering a patient',
          error,
        });
      }
    }
  },
  createReport: async function (req, res) {
    try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) {
        /* if patient id provided is not found in db */
        res.status(400).json({
          message: 'the patient id provided not found',
        });
      } else {
        /* create report */
        let { status, doctorComments } = req.body;
        doctorComments = doctorComments ? doctorComments : '';
        const report = await Report.create({
          byDoctor: res.locals.doctor.id,
          patientId: req.params.id,
          status,
          doctorComments,
        });
        res.status(201).json({
          message: 'report created',
          report,
        });
      }
    } catch (err) {
      const error = handleErrorsForReport(err);
      res.status(400).send({
        message: 'error in creating a report',
        error,
      });
    }
  },
  allReports: async function (req, res) {
    try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) {
        /* if patient id provided is not found in db */
        res.status(400).json({
          message: 'the patient id provided not found',
        });
      } else {
        /* get all reports */
        const reports = await Report.find({
          patientId: req.params.id,
        });
        res.status(201).json({
          message: 'all reports fetched',
          reports,
        });
      }
    } catch (err) {
      const error = handleErrorsForGetReports(err);
      res.status(400).send({
        message: 'error in getting all reports',
        error: error,
      });
    }
  },
};
