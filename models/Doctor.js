const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = new mongoose.model('doctor', doctorSchema);

module.exports = Doctor;
