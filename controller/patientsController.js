const Patient = require('../models/Patient');

const handleErrors = async function (err, body) {
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

module.exports = {
  register: async function (req, res) {
    try {
      const patient = await Patient.create(req.body);
      res.status(201).send(patient);
    } catch (err) {
      console.log(`error in registering a patient : ${err}`);
      const error = await handleErrors(err, req.body);
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
};
