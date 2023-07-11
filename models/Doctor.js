const mongoose = require('mongoose');
const { isEmail } = require('validator');

const doctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minLength: [6, 'Minimum password length is 6 characters'],
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = new mongoose.model('doctor', doctorSchema);

module.exports = Doctor;
