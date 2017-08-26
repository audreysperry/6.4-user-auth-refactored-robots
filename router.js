const express = require('express');
const passport = require('passport');

const IndexController = require('./controllers/index');
const ProfileController = require('./controllers/profile');
const UserController = require('./controllers/user');

const requireLogin = function (req, res, next) {
  if (req.user) {
    next()
  } else {
    res.redirect('/login/');
  }
};

module.exports = function(app) {
  const indexRouter = express.Router();
  const profileRouter = express.Router();
  const userRouter = express.Router();

  userRouter.get('/logout/', UserController.logout);
  userRouter.get('/login/', UserController.login);

  userRouter.post('/login/', passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login/',
      failureFlash: true
  }));

  userRouter.get('/signup/', UserController.signup);
  userRouter.post('/signup/', passport.authenticate('local-signup', {
    successRedirect: '/login/',
    failureRedirect: '/signup/',
    failureFlash: true
  }));



  indexRouter.use(requireLogin);
  indexRouter.get('/', IndexController.index);
  //
  profileRouter.use(requireLogin);


  profileRouter.post('/update/', ProfileController.update);
  profileRouter.get('/update/', ProfileController.form);
  profileRouter.get('/:id/', ProfileController.detail);


  app.use('/', userRouter);
  app.use('/robot', profileRouter);
  app.use('/', indexRouter);

};
