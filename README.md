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
