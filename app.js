const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash-messages');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./router');



const app = express();

// config view and static layout
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// passport user auth config

require('./controllers/passport');


// middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Router
routes(app);

var database = process.env.MONGODB_URI || 'mongodb://localhost:27017/robots2db';
//connect to the database and start teh server once the connectionis made
mongoose.connect(database);
// mongo.connect(database, () => {
//   app.listen(process.env.PORT || 3000);
// });

app.listen(3000);



module.exports = app;
