const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

// Generates a new application every time you call express()
const app = express()

// Create
passport.use(new GoogleStrategy())

const PORT = process.env.PORT || 5000
app.listen(PORT)