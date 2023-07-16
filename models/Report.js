const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    byDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, `Please enter doctor's object id`],
      ref: 'Doctor',
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, `Please enter patient's object id`],
      ref: 'Patient',
    },
    status: {
      type: String,
      required: [true, `Please enter patient's covid status`],
      enum: {
        values: ['negative', 'postive', 'quarantine'],
        message: `{VALUE} is not supported, please try one of these values ['negative','postive','quarantine']`,
      },
    },
    doctorComments: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = new mongoose.model('report', reportSchema);

module.exports = Report;
