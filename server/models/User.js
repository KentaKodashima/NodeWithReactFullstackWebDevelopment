const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 } // mongoose way of giving a default value
})

// Create a collection(model class)
mongoose.model('users', userSchema)