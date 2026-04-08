const { protect, adminOnly } = require('./authMiddleware');

module.exports = {
  authMiddleware: protect,
  isAdmin: adminOnly,
  protect,
  adminOnly,
};
