const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  // requireLogin is the custom middleware to check if the user is logged in or not
  //  which is called whenever request is sent to '/api/stripe'
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // Logic to handle the token
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    })

    req.user.credits += 5
    const user = await req.user.save()

    res.send(user)
  })
}