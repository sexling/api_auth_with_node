const passport = require('passport');
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const CustomError = require('../helpers/customError');

// JSON webtokens strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: 'superspecialawesome',
    },
    async (payload, done) => {
      try {
        const user = User.findById(payload.id);

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// Google Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         '258855009640-uih95oqd1nslq65amsjq5a2grn6kselv.apps.googleusercontent.com',
//       clientSecret: 'Z5-QCKMf4PYYNDQ6t4IJQbee',
//       // callbackURL: '/users/auth/google/redirect',
//     },
//     async (accessToken, refreshToken, profile, callback) => {
//       console.log('TCL: accessToken', accessToken);
//       console.log('TCL: profile', profile);
//       console.log('TCL: refreshToken', refreshToken);
//       callback(null, profile);
//     }
//   )
// );

// Google Strategy
passport.use(
  new GoogleTokenStrategy(
    {
      clientID:
        '258855009640-uih95oqd1nslq65amsjq5a2grn6kselv.apps.googleusercontent.com',
      clientSecret: 'Z5-QCKMf4PYYNDQ6t4IJQbee',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userExist = await User.findOne({
          email: profile.emails[0].value,
        });

        if (
          userExist &&
          userExist.google &&
          userExist.google.email === profile.emails[0].value
        ) {
          return done(null, userExist);
        }

        if (userExist) {
          return done(new CustomError('Email taken'), false);
        }

        const newUser = new User({
          email: profile.emails[0].value,
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        return done(new CustomError(err.message), false);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: '2043782379061582',
      clientSecret: 'd3422279db3c902273ba0423743ae286',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userExist = await User.findOne({
          email: profile.emails[0].value,
        });

        if (
          userExist &&
          userExist.facebook &&
          userExist.facebook.email === profile.emails[0].value
        ) {
          return done(null, userExist);
        }

        if (userExist) {
          return done(new CustomError('Email taken'), false);
        }

        const newUser = new User({
          email: profile.emails[0].value,
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(new CustomError(err.message), false);
      }
    }
  )
);

// Local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        console.log('TCL: localStrategy');
        const user = await User.findOne({ email });

        if (!user) {
          return done(new CustomError('User not found'), false);
        }

        if (user.password == undefined) {
          return done(new CustomError('Incorrect email or password'), false);
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          return done(new CustomError('Incorrect email or password'), false);
        }

        done(null, user);
      } catch (err) {
        return done(new CustomError(err.message), false);
      }
    }
  )
);
