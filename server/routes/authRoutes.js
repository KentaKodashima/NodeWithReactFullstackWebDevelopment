const passport = require('passport')

module.exports = app => {
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

  // route 3
  app.get(
    'api/logout', (req, res) => {
      req.logout()
      req.send(req.user) // empty user
    }
  )

  // route 4
  app.get(
    '/api/current_user', (req, res) => {
      res.send(req.user)
    }
  )
}