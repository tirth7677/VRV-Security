const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'fail',
        statusCode: 400,
        data: {
          error: 'User with this email already exists',
        },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    // Success response
    res.status(201).json({
      message: 'success',
      statusCode: 201,
      data: {
        userId: user._id, // Return the user ID for reference
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Error response
    res.status(500).json({
      message: 'fail',
      statusCode: 500,
      data: {
        error: error.message,
      },
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'fail',
        statusCode: 401,
        data: {
          error: 'Email not found in Database please sign up',
        },
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'fail',
        statusCode: 401,
        data: {
          error: 'Invalid email or password',
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.TOKEN_SECRET, {
      expiresIn: '1h',
    });

    // Success response
    res.status(200).json({
      message: 'success',
      statusCode: 200,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    // Error response
    res.status(500).json({
      message: 'fail',
      statusCode: 500,
      data: {
        error: error.message,
      },
    });
  }
};


module.exports = { signUp, login };