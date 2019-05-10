const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GuestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: {
    type: String,
    default: 'awaiting'
  },
  primary_guest: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Guest = mongoose.model('guests', GuestSchema);