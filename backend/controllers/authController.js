import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  // Dynamically get fields from req.body that are present in the User model schema
  const userData = {};
  for (const key in User.schema.paths) {
    if (req.body[key] !== undefined && key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') {
      userData[key] = req.body[key];
    }
  }

  // Ensure essential fields like email and password are provided, even if not explicitly in schema check
  if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email and password are required' });
  }
  // If not already included by the loop, add them
  if (!userData.email) userData.email = req.body.email;
  if (!userData.password) userData.password = req.body.password;


  try {
    const userExists = await User.findOne({ email: userData.email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create(userData);

    if (user) {
      // Return only specific fields for security, avoid sending back the whole user object
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id), // Optionally send token on register
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    // More specific error handling for validation errors
    if (error.name === 'ValidationError') {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        return res.status(400).json({ message: "Validation Error", errors });
    }
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};
