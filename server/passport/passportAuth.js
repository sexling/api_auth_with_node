const passport = require('passport');

module.exports = {
  jwt: passport.authenticate('jwt', { session: false }),
  signin: (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json(err); // send the error response to client
      }
      return next(); // continue to next middleware if no error.
    })(req, res, next); // passport.authentication returns a function, we invoke it with normal req..res arguments to override default functionality
  },
  googleOAuth: (req, res, next) => {
    passport.authenticate(
      'google-plus-token',
      {
        session: false,
      },
      (err, user, info) => {
        if (err || !user) {
          return res.status(400).json(err);
        }
        if (!req.value) {
          req.value = {};
        }

        req.value.user = user;

        return next();
      }
    )(req, res, next);
  },

  facebookOAuth: (req, res, next) => {
    passport.authenticate(
      'facebook-token',
      {
        session: false,
      },
      (err, user, info) => {
        if (err || !user) {
          return res.status(400).json(err);
        }
        if (!req.value) {
          req.value = {};
        }

        req.value.user = user;

        return next();
      }
    )(req, res, next);
  },
};
