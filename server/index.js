const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
// Define the User model class
require('./models/User')
// passport.js doesn't return anything
require('./services/passport')

mongoose.connect(keys.mongoURI)

// Generates a new application every time you call express()
const app = express()

// configure cookieSession to use in the app
// maxAge: how long it holds session
// Wiring up middlewares
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // milliseconds
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Equals to const authRoutes = require('./routes/authRoutes')
// Then call authRoutes(app)
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)