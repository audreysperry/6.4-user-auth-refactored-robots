const express = require('express');
const passport = require('passport');

const IndexController = require('./controllers/index');
const ProfileController = require('./controllers/profile');
const UserController = require('./controllers/user');

const requireLogin = function (req, res, next) {
  if (req.user) {
    next()
  } else {
    res.redirect('/signup/');
  }
};

module.exports = function(app) {
  const indexRouter = express.Router();
  const profileRouter = express.Router();
  const userRouter = express.Router();


  userRouter.get('/login/', UserController.login);

  userRouter.post('/login/', passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login/',
      failureFlash: true
  }));

  userRouter.get('/signup/', UserController.signup);
  userRouter.post('/signup/', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup/',
    failureFlash: true
  }));


  indexRouter.use(requireLogin);
  indexRouter.get('/', IndexController.index);
  //
  profileRouter.use(requireLogin);
  profileRouter.get('/:id/', ProfileController.detail);



  app.use('/', userRouter);
  app.use('/', indexRouter);
  app.use('/robot', profileRouter);
};
