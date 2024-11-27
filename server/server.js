const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const roleRoutes = require('./routes/role.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Health route
app.get('/', (req, res) => {
  try {
    const healthCheck = {
      uptime: process.uptime(), // Server uptime in seconds
      timestamp: new Date(), // Current server time
    };

    res.status(200).json({
      message: 'success',
      statusCode: 200,
      data: healthCheck,
    });
  } catch (error) {
    console.error('Health check failed:', error.message);
    res.status(500).json({
      message: 'fail',
      statusCode: 500,
      data: {
        error: 'Unable to fetch health details',
      },
    });
  }
});


// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/role', roleRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});