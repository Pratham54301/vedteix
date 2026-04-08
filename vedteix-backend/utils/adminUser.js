const User = require('../models/User');

async function ensureAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return;
  }

  const normalizedEmail = adminEmail.trim().toLowerCase();
  let adminUser = await User.findOne({ email: normalizedEmail });

  if (!adminUser) {
    adminUser = new User({
      name: process.env.ADMIN_NAME || 'Vedteix Admin',
      email: normalizedEmail,
      password: adminPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log(`Seeded admin user for ${normalizedEmail}`);
    return;
  }

  let hasChanges = false;

  if (adminUser.role !== 'admin') {
    adminUser.role = 'admin';
    hasChanges = true;
  }

  if (process.env.ADMIN_SYNC_PASSWORD !== 'false') {
    adminUser.password = adminPassword;
    hasChanges = true;
  }

  if (hasChanges) {
    await adminUser.save();
  }
}

module.exports = { ensureAdminUser };
