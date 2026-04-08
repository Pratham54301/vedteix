const express = require('express');
const { passport, isGoogleAuthConfigured } = require('../config/passport');
const {
  destroySession,
  finalizeSessionLogin,
  getFrontendBaseUrl,
  normalizeReturnTo,
} = require('../utils/authSession');

const router = express.Router();

function buildFrontendUrl(pathname, params = {}) {
  const frontendBaseUrl = getFrontendBaseUrl();
  const url = new URL(pathname, `${frontendBaseUrl}/`);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

router.get('/google', (req, res, next) => {
  if (!isGoogleAuthConfigured()) {
    res.redirect(buildFrontendUrl('/login', { error: 'google_not_configured' }));
    return;
  }

  const returnTo = normalizeReturnTo(req.query.from || req.query.returnTo, '/dashboard');

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    state: returnTo,
    session: false,
  })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  const returnTo = normalizeReturnTo(req.query.state, '/dashboard');
  const failureRedirect = buildFrontendUrl('/login', {
    error: 'google_failed',
    from: returnTo,
  });

  passport.authenticate(
    'google',
    {
      failureRedirect,
      session: false,
    },
    async (error, user) => {
      if (error) {
        console.error('Google OAuth callback error:', error);
        res.redirect(
          buildFrontendUrl('/login', {
            error: 'google_callback_failed',
            from: returnTo,
          })
        );
        return;
      }

      if (!user) {
        res.redirect(failureRedirect);
        return;
      }

      try {
        const session = await finalizeSessionLogin(req, user, { returnTo });
        res.redirect(buildFrontendUrl(session.returnTo));
      } catch (sessionError) {
        console.error('Google session finalization error:', sessionError);
        res.redirect(
          buildFrontendUrl('/login', {
            error: 'google_session_failed',
            from: returnTo,
          })
        );
      }
    }
  )(req, res, next);
});

router.get('/logout', async (req, res) => {
  try {
    await destroySession(req, res);
    res.redirect(buildFrontendUrl('/'));
  } catch (error) {
    console.error('Logout redirect error:', error);
    res.redirect(buildFrontendUrl('/login', { error: 'logout_failed' }));
  }
});

module.exports = router;
