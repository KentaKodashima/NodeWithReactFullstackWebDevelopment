const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String
})

// Create a collection(model class)
mongoose.model('users', userSchema)