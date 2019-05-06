const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InvitationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: {
    type: String,
    default: 'draft'
  },
  // guests: [
  //   {
  //     _id: guest-id,
  //     primary: guest-id,
  //     attending: Boolean
  //   }
  // ],
  // last_emailed,
  // follow_ups,


  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Invitation = mongoose.model('invitations', InvitationSchema);