# Node with React: Fullstack Web Development
This is the repository to store what I'm learning in the Udemy course titled 'Node with React: Fullstack Web Development' by Stephen Grider.

1. [Objective](#Objective)
2. [Node and Express](#Node-and-Express)
3. [Common JS Modules](#Common-JS-Modules)
4. [Express](#Express)
5. [Deployment using Heroku](#Deployment-using-Heroku)
6. [PassportJS](#PassportJS)
7. [OAuth](#OAuth)
8. [Signing in flow](#Signing-in-flow)
9. [MongoDB](#MongoDB)
10. [Client server and Express server](#Client-server-and-Express-server)
11. [Create-react-app's Proxy - Handling routing in Dev Encironment](#Create-react-app-Proxy---Handling-routing-in-Dev-Encironment)
12. [Webpack with CSS](#Webpack-with-CSS)
13. [Redirecting a User on Auth](#Redirecting-a-User-on-Auth)
14. [Link and anchor tags](#Link-and-anchor-tags)
15. [Billing with Stripe](#Billing-with-Stripe)
16. [Route-Specific Middlewares](#Route---Specific-Middlewares)



## Objective
Learning fullstack development by building a web app using React, Redux, Node.js, Express and MongoDB.

## Node and Express
### What is Node
Javascript runtime used to execute code outside of the browser.

### What is Express
Library that runs in the Node runtime. Has helpers to make dealing with HTTP traffic easier.

## Common JS Modules
Currently, Node.js runtime only has support for common JS modules. The common JS modules is a system implemented in Node.js for requiring or sharing code between different files.

```
// Common JS Modules
const express = require('express')

// ES 2015 Modules
import express from 'express'
```

## Express

```
// app: Express App to register this route handler with
// get: Watch for incoming requests with this method
// '/' Watch for requests trying to access '/'
// req: Object representing the incoming request
// res: Object representing the outgoing response
// res.send({hi: 'there'}): Immediately send soma JSON back

app.get('/', (req, res) => {
  res.send({hi: 'there'})
})

// Listen for incoming reqests for port 5000
app.listen(5000)
```

### Express methods
- get:  
  Get info
- post:  
  Send info
- put:  
  Update all the properties of something
- delete:  
  Delete something
- patch:  
  Update one or two properties of something

## Deployment using Heroku

1. Dynamic Port Binding  
Whenever heroku runs our application, it has the ability to pass us runtime configuration or some configuration that Heroku to tell us after we have actually deployed our application.  
We don't know which port Heroku will use at runtime, but Heroku will pass the port via environmental variables.

```
// In the development environment, use 5000 (default value)
const PORT = process.env.PORT || 5000
```

2. Specify Node Environment  
We want to use a specific version of node, so we need to tell Heroku which version we want. In order to do so, we just need to add "engine" inside of the package.json file.
```
"main": "index.js",
"engines": {
  "node": "11.3.0",
  "npm": "6.4.1"
},
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

3. Specify start script
Specify the command to run or start our server. In order to do so, just add a script inside of "scripts".
```
"scripts": {
  "start": "node index.js"
},
```

4. Create .gitignore file

## PassportJS
Passport is authentication middleware for Node.js. It helps handling auth in Express apps.

```
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken) => {
    console.log(accessToken)
  })  
)

// Calling GoogleStrategy just configured
// This is possible because GoogleStrategy has the internal identifier called 'google'
// 'scope' tells Google's server that what our application needs
app.get(
  '/auth/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)
```

### serializeUser
serializeUser is automatically called by passport with the user model which has been created when the user signs up.

### deserializeUser
deserializeUser is automatically called by passport with the token to reach into the user model.

## OAuth
### redirect_uri
Bad people can bring users to their website to get users' personal info by changing redirect_uri to their website's URL. Therefore, redirect URIs need to be authorized to prevent users from being hacked.
```
https://accounts.google.com/o/oauth2/v2/auth?
response_type=code&
redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&
client_id=someones_client_id
```

## Statelessness of HTTP
By default, infomation related to different requests is not shared between those requests. Even after the user login, therefore, when the app tries to fetch the user's info such as posts, it cannot recognize the user.

In order to solve this problem, the server gives `cookie: token` to the browser(user) as a proof of the login state. When the browser sents different requests, use this proof to properly fetch the user's data.

## Signing in flow
### Email/Password
1. Sign up
2. Sign out
3. Login with the same email/password

### OAuth(Google)
1. Sign up with Google profile
2. Sign out
3. Login with Google profile

In OAuth, the sign up and login auth flows are the same. Therefore, we need to find some unique identifying token in the user's Google profile.

## MongoDB
Mongo internally stores records into different collections. Every different collection can have many different records.

### MongoDB is Schemaless DB
Inside of a one single collection, every record can have its own very distinct set of properties.  
**Note:** In traditional relational DB such as SQL, every single records must have exact same properties.

### mongoose.js
mongoose.js helps us to create MongoDB's type of structure in JS world.
'Collection' in MongoDB is represented as 'Model Class' and 'record' in MongoDB is represented as 'Model Instance'.

Unlike MongoDB itself, it needs to know all of different properties that our records will have using `Schema`.

#### Setting up a model class
User.js
```
const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String
})

// Create a collection(model class)
mongoose.model('users', userSchema)
```
index.js
```
// Need to include this line at the top to make sure User is recognized
//   when the app first boots up.
require('./models/User')
```

### Dev and Prod Environment
- Need to set up different projects for each environment on Atlas  
  **Note:** Better to use completely different username and password for security reasons
- Need to set up different projects for each environment on Google Developer Console  
  **Note:** Better to use completely different username and password for security reasons
  
## Client server and Express server
- Express server  
  Send JSON stuff to the browser
- React server  
  Send JS/JSX stuff to the browser
  
## Create-react-app Proxy - Handling routing in Dev Encironment
A little bit work is needed to make routing work between Express server and React server.

1. Install the library called `http-proxy-middleware`
2. Create the file called `setupProxy.js`
3. Configure the proxy inside of the `setupProxy.js` file

```
const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
  app.use(
    proxy(
      '/auth/google', // context
      { target: 'http://localhost:5000' }) // target
    );
};
```

**Explaination**
Every time the React app needs data from API, the request goes to `create-react-app` proxy. By setting up the proxy, given context is wired up with the target and forward the request to the target.

**Note:**
All of these works are only for dev environment because there would only be Express server in prod environment. 

## Webpack with CSS
index.js
```
import 'materialize-css/dist/css/materialize.min.css'
```

**Note:** If we don't use relative path in an `import` statement, React automatically recognize it is inside of the node_modules.

## Redirecting a User on Auth
### Login
After the user successfully log in, the error saying `Cannot GET /auth/google/callback` appears. In order to avoid this, we need to redirect the user back to the app.

1. The user comes to `/auth/google/callback`
2. `passport.authenticate('google'` does its work and pass the request on to the handler in the chain
3. Redirect the user
```
app.get(
    '/auth/google/callback', 
    passport.authenticate('google'), // middleware
    (req, res) => {
      res.redirect('/surveys')
    }
)
```

### Logout
We need to empty the cookie. There are two ways to do that.
1. Full HTTP Request  
Will cause the entire browser page to refresh
2. AJAX Request  
No page refresh, but we have to handle action creators, reducer, etc, and redirect to landing page

## Link and anchor tags
### Link
Navigate to a different route rendered by React Router

### anchor
Navigate to a completely different HTML document 

## Billing with Stripe
1. User clicks 'Add credits'
2. Tell Stripe to show a credit card form
3. User enters credit card details
4. The details sent from the form to Stripe
5. Stripe sends back a token representing the charge
6. We send token to API
7. API confirms the charge was successful with Stripe
9. Add credits to the user account

### Configuration
- amount: In cents
- token: Expecting to receive a callback with the token (onToken)
- stripeKey: Publishable key

```
<ReactStripeCheckout
    amount={500}
    token={token => console.log(token)}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
/>
```

### Helpers
#### Stripe (NPM module)
The Stripe Node library provides convenient access to the Stripe API from applications written in server-side JavaScript.

#### body-parser
Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

### Creating a charge

billingRoutes.js (backend)

```
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    // Logic to handle the token
    
    // 1. Create Charge obj
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    })

    // Update the User obj using passport's user
    req.user.credits += 5
    const user = await req.user.save()

    // send back response
    res.send(user)
  })
}
```

## Route-Specific Middlewares
1. Create custom middleware (middlewares/requireLogin)
2. Assign the middleware as one of the route's args

requireLogin.js (custom middleware)
```
// next: Passes the req to the next middleware on the chain
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You need to log in first!' })
  }

  // Move on to the next if there is an user
  next()
}
```

billingRoutes.js
```
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
```

## Express Server in Production
We define some routes in React-side of the app. However, server-side of the app also has some routes to handle AJAX requests. Therefore, we need to tell Express server which side of the app to use in order to avoid HTTP errors.

1. Routes in Express sever
2. Routes in index.html
3. Routes in main.js