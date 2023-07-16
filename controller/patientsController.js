const Patient = require('../models/Patient');

const handleErrors = function (err) {
  let errors = { name: '', age: '', sex: '', phone: '' };

  /* patient register error handling */
  /* handle duplicate phone number register */
  if (err.code === 11000) {
    errors.phone = 'This phone number is already registered';
    return errors;
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
      const error = handleErrors(err);
      res.status(400).send({
        message: 'error in registering a patient',
        error,
      });
    }
  },
};
