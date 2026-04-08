const User = require('../models/User');
const {
  buildSessionUser,
  destroySession,
  finalizeSessionLogin,
} = require('../utils/authSession');

// Input validation helpers
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function isValidPassword(password) {
  if (typeof password !== 'string') return false;
  // Minimum 8 characters, at least one letter and one number
  return password.length >= 8 && password.length <= 128 && /[a-zA-Z]/.test(password) && /\d/.test(password);
}

function isValidName(name) {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100 && /^[a-zA-Z\s'-]+$/.test(trimmed);
}

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, returnTo } = req.body;
    
    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!isValidName(name)) {
      return res.status(400).json({ 
        error: 'Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes' 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ 
        error: 'Password must be 8-128 characters and contain at least one letter and one number' 
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password 
    });
    const session = await finalizeSessionLogin(req, user, { returnTo });
    
    res.status(201).json({
      success: true,
      user: session.user,
      returnTo: session.returnTo,
    });
  } catch (err) {
    // Don't expose internal error details
    console.error('Registration error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed' });
    }
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, returnTo } = req.body;
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    
    // Use same error message for both cases to prevent user enumeration
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.password) {
      return res.status(401).json({
        error: 'This account uses Google sign-in. Please continue with Google.',
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const session = await finalizeSessionLogin(req, user, { returnTo });
    
    res.json({
      success: true,
      user: session.user,
      returnTo: session.returnTo,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.json({
      success: true,
      user: buildSessionUser(user),
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Failed to load the current session' });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    await destroySession(req, res);
    res.json({ success: true });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Failed to logout cleanly' });
  }
};
