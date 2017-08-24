const express = require('express');
const IndexController = require('./controllers/index');
const ProfileController = require('./controllers/profile');
const UserController = require('./controllers/user');


module.exports = function(app) {
  const indexRouter = express.Router();
  const profileRouter = express.Router();
  const userRouter = express.Router();



  userRouter.get('/login/', function(req, res) {
      res.render("login", {
          messages: res.locals.getMessages()
      });
  });
  userRouter.post('/login/', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login/',
      failureFlash: true
  }));

  indexRouter.get('/', IndexController.index);

  profileRouter.get('/:id/', ProfileController.detail);


  app.use('/', indexRouter);
  app.use('/robot', profileRouter);
}
