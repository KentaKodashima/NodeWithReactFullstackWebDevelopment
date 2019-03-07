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
    passport.authenticate('google'), // middleware
    (req, res) => {
      res.redirect('/surveys')
    }
  )

  // route 3
  app.get(
    '/api/logout', (req, res) => {
      req.logout()
      res.redirect('/') // empty user
    }
  )

  // route 4
  // The request to this route gives us the current user's status(login/logout)
  app.get(
    '/api/current_user', (req, res) => {
      res.send(req.user)
    }
  )
}