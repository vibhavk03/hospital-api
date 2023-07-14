const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');

const handleErrors = function (err) {
  let errors = { email: '', password: '' };

  /* doctor login error handling */
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
  }

  if (err.message === 'incorrect password') {
    errors.email = 'that password is not incorrect';
  }

  /* doctor register error handling */
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

/* max age is 1 hour */
const maxAge = 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'thisIsMySecret', {
    expiresIn: maxAge,
  });
};

module.exports = {
  register: async function (req, res) {
    try {
      const doctor = await Doctor.create(req.body);
      const token = createToken(doctor._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
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
  login: async function (req, res) {
    const { email, password } = req.body;
    try {
      const doctor = await Doctor.login(email, password);
      const token = createToken(doctor._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.json({ doctorId: doctor.id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({
        message: 'error in login',
        error: errors,
      });
    }
  },
  checkLogin: function (req, res) {
    /* route to check if logged in successfully */
    console.log(res.locals.doctor);
    res.json({
      message: 'you are logged in',
    });
  },
  logout: async function (req, res) {
    /* setting jwt token as empty string with 1 millisecond expiry */
    res.cookie('jwt', '', { maxAge: 1 });
    res.json({
      message: 'logged out successfully!',
    });
  },
};
