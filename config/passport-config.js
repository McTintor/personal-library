const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('../db/pool');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Query for the user by username
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      
      // If no user found
      if (result.rows.length === 0) {
        return done(null, false, { message: 'Invalid username' });
      }

      const user = result.rows[0];

      // Check password
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        return done(null, false, { message: 'Invalid password' });
      }

      // Authentication successful
      return done(null, user);
    } catch (err) {
      // Handle errors
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    // Fetch user by ID
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return done(new Error('User not found'));
    }
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
