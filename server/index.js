const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
// Define the model classes
require('./models/User')
require('./models/Survey')
// passport.js doesn't return anything
require('./services/passport')

mongoose.connect(keys.mongoURI)

// Generates a new application every time you call express()
const app = express()

// configure cookieSession to use in the app
// maxAge: how long it holds session
// Wiring up middlewares
app.use(bodyParser.json())
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
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

// Configuration to make static page routing work in production
if(process.env.NODE_ENV === 'production'){
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static('client/build'))

  // Express will serve up the index.html file
  //   if it doesn't recognize the route (Kicks back to React side)
  const path = require('path')
  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)