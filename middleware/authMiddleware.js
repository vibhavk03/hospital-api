const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  /* check if jwt exists and is verified */
  if (token) {
    jwt.verify(token, 'thisIsMySecret', (err, decodedToken) => {
      if (err) {
        res.status(400).json({
          message: `error in accessing this route`,
          error: `${err.message}`,
        });
      } else {
        console.log('decodedToken --> ', decodedToken);
        next();
      }
    });
  } else {
    res.status(400).json({
      message: 'error in accessing this route - please login',
    });
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  /* check if jwt exists and is verified */
  if (token) {
    jwt.verify(token, 'thisIsMySecret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const doctor = await Doctor.findById(decodedToken.id);
        res.locals.doctor = doctor;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireDoctor = (req, res, next) => {
  const token = req.cookies.jwt;
  /* check if jwt exists and is verified */
  if (token) {
    jwt.verify(token, 'thisIsMySecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({
          message: `error in accessing this route, please login`,
          error: `${err.message}`,
        });
      } else {
        const doctor = await Doctor.findById(decodedToken.id);
        res.locals.doctor = doctor;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: 'error in accessing this route, please login',
    });
  }
};

module.exports = { requireAuth, checkUser, requireDoctor };
