const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

// Create Model Class
const User = mongoose.model('users')

// Serialize and deserialize user's id inside of cookie/session
passport.serializeUser((user, done) => {
  // user.id refers to User Model Instance ID created by MongoDB
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

// accessToken is needed to prove that the application is permitted to fetch user info
// refreshToken is needed to refresh accessToken
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser)
          } else {
            // Create a model instance
            // Then save() the instance to DB
            new User({ googleId: profile.id }).save()
              .then(user => done(null, user))
          }
        })
    }
  )
)