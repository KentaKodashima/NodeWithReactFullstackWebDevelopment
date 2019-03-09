const mongoose = require('mongoose')
const { Schema } = mongoose
const RecipientScheme = require('./Recipient')

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientScheme],
  yea: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // Relationship fields
  dateSent: Date,
  lastResponded: Date
})

// Create a collection(model class)
mongoose.model('surveys', surveySchema)