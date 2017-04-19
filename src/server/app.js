import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import LocalStrategy from 'passport-local';
import passport from 'passport';
import session from 'express-session';

import { User } from './data/models/index';

// Load local config into process.env
dotenv.config();

// Connect to MongoDB to let queued models sync with the database while Express is loading
mongoose.connect(process.env.MONGO_URL);

const app = express();

// Install morgan middleware first to log all requests
app.use(morgan('combined'));

// Set up our views
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// Some more middleware for handling cookies, etc.
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

/* BACKEND ENDPOINTS */

// USERS
// Login/Authentication

// Passport strategies must be created before used in Express routes
passport.use(new LocalStrategy.Strategy(
  {
    usernameField: 'email',
  },
  (email, password, done) => {
    User.findOne({ email })
        .then((user) => {
          if (!user) { return done(null, false); }
          return user.comparePasswords(password)
            .then((isValid) => {
              if (isValid) {
                done(null, user);
              } else {
                done(null, false);
              }
            });
        })
        .catch(err => done(err));
  },
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id })
    .then(user => done(null, user))
    .catch(err => done(err));
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => res.json(req.user),
);

// Registration
app.post('/register',
  (req, res) => {
    if (!req.body) return res.sendStatus(400);
    return User.create(req.body)
        .then(newUser => res.json(newUser))
        .catch(err => res.json({ message: err }));
  },
);

app.get('/',
  (req, res) =>
    res.render('index', {
      title: 'Welcome to the ME template!',
      message: 'Congrats, it\'s working!',
    }),
);

// All of the content in 'public' is static and reachable
app.use(express.static(`${__dirname}/public`));

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`ME template Express server listening on port ${port}...`);
