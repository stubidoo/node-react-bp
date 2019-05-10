const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InvitationSchema = new Schema({
  status: {
    type: String,
    default: 'draft'
  },
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  last_emailed: {
    type: Date,
    default: null
  },
  date_of_rsvp: {
    type: Date,
    default: null
  },
  follow_ups: {
    type: Number,
    default: 0
  },
  thank_you_message: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Invitation = mongoose.model('invitations', InvitationSchema);