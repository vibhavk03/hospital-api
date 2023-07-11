const Doctor = require('../models/Doctor');

module.exports = {
  register: async function (req, res) {
    try {
      const doctor = await Doctor.create(req.body);
      res.status(201).send(doctor);
    } catch (error) {
      console.log(`error in registering a doctor : ${error}`);
      res.status(400).send({
        message: 'error in registering a doctor',
        error: `${error}`,
      });
    }
  },
};
