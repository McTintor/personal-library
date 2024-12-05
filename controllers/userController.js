const pool = require('../db/pool');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

exports.getRegister = (req, res) => {
  res.render('index', { errorMessage: null }); // Render registration form
};

exports.postRegister = async (req, res) => {
    const { username, password, firstname, lastname, email } = req.body;
  
    try {
      // Step 1: Check if the email already exists
      const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (existingUser.rows.length > 0) {
        // If email exists, render the registration form with an error message
        return res.render('index', { errorMessage: 'Email is already in use' });
      }
  
      // Step 2: Check if the username already exists
      const existingUsername = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      
      if (existingUsername.rows.length > 0) {
        // If username exists, render the registration form with an error message
        return res.render('index', { errorMessage: 'Username is already in use' });
      }
  
      // Step 3: If no existing user, hash the password and create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await User.create({
        username,
        firstname,
        lastname,
        password: hashedPassword,
        email
      })
  
      // Step 4: Redirect to login page after successful registration
      res.redirect('/login');
      console.log('Successfully created your account. Please login now.');
      
    } catch (err) {
      console.error(err);
      res.render('index', { errorMessage: 'Error registering user' });
    }
  };
  

exports.getLogin = (req, res) => {
  res.render('login', { messages: req.flash() }); // Render login form
};

exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('error', 'Invalid username or password');
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/mainpage');
      });
    })(req, res, next);
  };
  
  

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};
