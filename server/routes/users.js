const express = require('express');
const router = require('express-promise-router')();
const passportConfig = require('../passport/passport');

const { validateBody, schemas } = require('../helpers/routerHelper');
const passportAuth = require('../passport/passportAuth');
const UsersController = require('../controllers/users');

router.post(
  '/signup',
  validateBody('signup', schemas.authSchema),
  UsersController.signUp
);

router.post(
  '/signin',
  validateBody(schemas.authSchema),
  passportAuth.signin,
  UsersController.signIn
);

router.post(
  '/auth/google',
  passportAuth.googleOAuth,
  UsersController.googleOAuth
);

router.post(
  '/auth/facebook',
  passportAuth.facebookOAuth,
  UsersController.facebookOAuth
);

router.get('/secret', passportAuth.jwt, UsersController.secret);

module.exports = router;
