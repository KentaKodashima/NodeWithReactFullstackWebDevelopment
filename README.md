# Node with React: Fullstack Web Development
This is the repository to store what I'm learning in the Udemy course titled 'Node with React: Fullstack Web Development' by Stephen Grider.

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
  
## Create-react-app's Proxy - Handling routing in Dev Encironment
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

