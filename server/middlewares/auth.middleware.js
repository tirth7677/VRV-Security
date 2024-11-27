const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'fail',
        statusCode: 401,
        data: {
          error: 'Access token is missing',
        },
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'fail',
          statusCode: 401,
          data: {
            error: 'Invalid token',
          },
        });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({
      message: 'fail',
      statusCode: 500,
      data: {
        error: error.message,
      },
    });
  }
};

const authorizeRole = (roles) => (req, res, next) => {
  try {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'fail',
        statusCode: 403,
        data: {
          error: 'Access forbidden: Insufficient permissions',
        },
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: 'fail',
      statusCode: 500,
      data: {
        error: error.message,
      },
    });
  }
};

module.exports = { validateToken, authorizeRole };
