const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

/* hasing password before saving to the db - using mongose hooks */
doctorSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* static method to login user */
doctorSchema.statics.login = async function (email, password) {
  const doctor = await this.findOne({ email });
  if (doctor) {
    const auth = await bcrypt.compare(password, doctor.password);
    if (auth) {
      return doctor;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const Doctor = new mongoose.model('doctor', doctorSchema);

module.exports = Doctor;
