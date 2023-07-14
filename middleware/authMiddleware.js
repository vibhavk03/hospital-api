const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };
