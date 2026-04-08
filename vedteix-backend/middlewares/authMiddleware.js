const User = require('../models/User');
const { buildSessionUser } = require('../utils/authSession');

async function resolveAuthenticatedUser(req) {
  if (req.user?._id) {
    return req.user;
  }

  const sessionUserId = req.session?.user?.id;
  if (!sessionUserId) {
    return null;
  }

  const user = await User.findById(sessionUserId).select('-password');
  if (user) {
    req.user = user;
  }

  return user;
}

const protect = async (req, res, next) => {
  try {
    const user = await resolveAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.session.user = buildSessionUser(user);
    next();
  } catch (err) {
    console.error('Session auth error:', err);
    res.status(500).json({ error: 'Authentication check failed' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin' || req.session?.user?.role === 'admin') {
    return next();
  }

  return res.status(403).json({ error: 'Admin access required' });
};

module.exports = { protect, adminOnly, isAdmin: adminOnly }; 
