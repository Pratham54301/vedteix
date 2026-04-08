const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User');

function isGoogleAuthConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

function configurePassport() {
  passport.serializeUser((user, done) => {
    done(null, String(user._id));
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('-password');
      done(null, user || false);
    } catch (error) {
      done(error);
    }
  });

  if (!isGoogleAuthConfigured()) {
    return passport;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          `${process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 5001}`}/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.trim().toLowerCase();
          if (!email) {
            done(new Error('Google account did not provide an email address'));
            return;
          }

          const profileImage = profile.photos?.[0]?.value || '';
          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email }],
          });

          if (!user) {
            user = await User.create({
              name: profile.displayName || email.split('@')[0],
              email,
              googleId: profile.id,
              profileImage,
              role: 'user',
            });
          } else {
            let hasChanges = false;

            if (!user.googleId) {
              user.googleId = profile.id;
              hasChanges = true;
            }

            if (profileImage && user.profileImage !== profileImage) {
              user.profileImage = profileImage;
              hasChanges = true;
            }

            if (profile.displayName && user.name !== profile.displayName) {
              user.name = profile.displayName;
              hasChanges = true;
            }

            if (hasChanges) {
              await user.save();
            }
          }

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  return passport;
}

module.exports = {
  configurePassport,
  isGoogleAuthConfigured,
  passport,
};
