const Report = require('../models/Report');

const hasValidStatusEnum = function (status) {
  const permittedStatuses = ['negative', 'positive', 'quarantine'];
  return permittedStatuses.includes(status);
};

module.exports = {
  getReports: async function (req, res) {
    try {
      if (hasValidStatusEnum(req.params.status)) {
        const reports = await Report.find({ status: req.params.status });
        res.status(200).send({
          message: `all reports with '${req.params.status}' status fetched`,
          reports,
        });
      } else {
        res.status(400).json({
          message: `the status is incorrect, please try one of these values ['negative','positive','quarantine']`,
        });
      }
    } catch (err) {
      console.log(`error in getting all status reports : ${err}`);
      res.status(400).send({
        message: 'error in getting all status reports',
        error: err,
      });
    }
  },
};
