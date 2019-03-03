const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./config/keys')

// Generates a new application every time you call express()
const app = express()

// accessToken is needed to prove that the application is permitted to fetch user info
// refreshToken is needed to refresh accessToken
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log('access',accessToken)
    console.log('refresh',refreshToken)
    console.log('profile',profile)
    console.log('done',done)
  })  
)

// route 1
app.get(
  '/auth/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

// route 2
// Will return accessToken
app.get(
  '/auth/google/callback', 
  passport.authenticate('google')
)

const PORT = process.env.PORT || 5000
app.listen(PORT)