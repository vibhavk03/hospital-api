const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, `Please enter patient's name`],
      minLength: [1, `Please enter patient's name`],
    },
    age: {
      type: Number,
      required: [true, `Please enter patient's age`],
      min: [0, 'Please enter valid age'],
    },
    sex: {
      type: String,
      required: [true, `Please enter patient's sex`],
      enum: {
        values: ['M', 'F'],
        message: `{VALUE} is not supported, only 'M' and 'F' supported`,
      },
    },
    phone: {
      type: String,
      required: [true, `Please enter patient's phone number`],
      unique: true,
      minLength: [10, `Please enter patient's valid 10 digit phone number`],
      maxLength: [10, `Please enter patient's valid 10 digit phone number`],
    },
  },
  {
    timestamps: true,
  }
);

const Patient = new mongoose.model('patient', patientSchema);

module.exports = Patient;
