const express = require('express')
// Generates a new application every time you call express()
const app = express()

app.get('/', (req, res) => {
  res.send({hi: 'there'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)