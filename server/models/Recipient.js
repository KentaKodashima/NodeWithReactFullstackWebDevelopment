// Subdocument collections
const mongoose = require('mongoose')
const { Schema } = mongoose

const recipientSchema = new Schema({
  email: String,
  respond: { type: Boolean, default: false }
})

module.exports = recipientSchema