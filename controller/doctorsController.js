const Doctor = require('../models/Doctor');

const handleErrors = function (err) {
  let errors = { email: 'no error', password: 'no error' };

  /* handle duplicate email register */
  if (err.code === 11000) {
    errors.email = 'This email is already registered';
    return errors;
  }

  if (err.message.includes('doctor validation failed')) {
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
      const doctor = await Doctor.create(req.body);
      res.status(201).send(doctor);
    } catch (err) {
      console.log(`error in registering a doctor : ${err}`);
      const error = handleErrors(err);
      res.status(400).send({
        message: 'error in registering a doctor',
        error,
      });
    }
  },
};
