const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  status: {
    type: String,
    default: 'awaiting'
  },
  primary_guest: {
    type: Boolean,
    default: false
  },
  auth_type: {
    type: String,
    default: 'guest'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);