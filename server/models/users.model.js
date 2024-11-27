const mongoose = require('mongoose');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex for validation
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Password should have at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: validateEmail,
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator: validatePassword,
        message:
          'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one digit, and one special character',
      },
    },
    role: {
      type: String,
      enum: ['User', 'Admin', 'Moderator'],
      default: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
