// next: Passes the req to the next middleware on the chain
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You need to log in first!' })
  }

  // Move on to the next if there is an user
  next()
}