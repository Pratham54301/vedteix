const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'vedteix.sid';

function getFrontendBaseUrl() {
  return (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((value) => value.trim())
    .find(Boolean)
    ?.replace(/\/$/, '') || 'http://localhost:3000';
}

function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  };
}

function buildSessionUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: String(user._id || user.id),
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage || '',
  };
}

function normalizeReturnTo(returnTo, fallback = '/dashboard') {
  if (typeof returnTo !== 'string' || !returnTo.startsWith('/') || returnTo.startsWith('//')) {
    return fallback;
  }

  return returnTo;
}

async function finalizeSessionLogin(req, user, { returnTo } = {}) {
  const defaultTarget = user?.role === 'admin' ? '/admin' : '/dashboard';
  let target = normalizeReturnTo(returnTo, defaultTarget);
  if (target.startsWith('/admin') && user?.role !== 'admin') {
    target = '/dashboard';
  }
  const sessionUser = buildSessionUser(user);

  await new Promise((resolve, reject) => {
    req.session.regenerate((regenerateError) => {
      if (regenerateError) {
        reject(regenerateError);
        return;
      }

      req.logIn(user, (loginError) => {
        if (loginError) {
          reject(loginError);
          return;
        }

        req.session.user = sessionUser;
        req.session.save((saveError) => {
          if (saveError) {
            reject(saveError);
            return;
          }

          resolve(undefined);
        });
      });
    });
  });

  return {
    user: sessionUser,
    returnTo: target,
  };
}

async function destroySession(req, res) {
  await new Promise((resolve, reject) => {
    const finalize = () => {
      if (!req.session) {
        resolve(undefined);
        return;
      }

      req.session.destroy((destroyError) => {
        if (destroyError) {
          reject(destroyError);
          return;
        }

        resolve(undefined);
      });
    };

    if (typeof req.logout === 'function') {
      req.logout((logoutError) => {
        if (logoutError) {
          reject(logoutError);
          return;
        }

        finalize();
      });
      return;
    }

    finalize();
  });

  res.clearCookie(SESSION_COOKIE_NAME, getSessionCookieOptions());
}

module.exports = {
  SESSION_COOKIE_NAME,
  buildSessionUser,
  destroySession,
  finalizeSessionLogin,
  getFrontendBaseUrl,
  getSessionCookieOptions,
  normalizeReturnTo,
};
