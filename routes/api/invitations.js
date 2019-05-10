const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Guest model
const Guest = require('../../models/Guest');
const User = require('../../models/User');
const Invitation = require('../../models/Invitation');

// @route   GET api/invitations/test
// @desc    Tests invitations route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Invitations Works' }));

// @route   POST api/invitations/
// @desc    Create new invitation
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // console.log(req.body)
  // const guests = ['5cceb9e89990d63e7aa0a0c5']
  
  // TODO: check if valid user and if primary user
  // TODO: if user, then primary guest
  guests = [];
  guests.push(req.body.primary_guest);

  new Invitation({
    guests
  }).save().then(profile => res.json(profile));
});

// @route   POST api/invitations/guests
// @desc    Add guests to invitation
// @access  Private
router.post('/guests', passport.authenticate('jwt', { session: false }), (req, res) => {
  // TODO: add validation, default fields: invitation_id, user_id
  Invitation.findById(req.body.invitation_id)
    .then(invitation => {
      if(invitation) {
        User.findById(req.body.user_id)
        .then( user => {
          if(user) {
            invitation.guests.push(req.body.user_id);
            invitation.save()
              .then( invitation => res.json(invitation))
              .catch(err => res.json({invitation: err}))
          } else {
            res.json({user: 'User ID does not exist.'})
          }
        })
        .catch(err => res.json({user: err}))
      } else {
        res.json({invitation: 'Invitation ID does not exist.'})
      }
      
    })
    .catch(err => res.json({invitation: err}));
});

// TODO:::::::

// @route   GET api/invitations/:invitation_id
// @desc    Get an invitation
// @access  Private

// @route   GET api/invitations/
// @desc    Get all invitations
// @access  Private

// @route   DELETE api/invitations/:invitation_id
// @desc    Remove an invitation
// @access  Private

// @route   DELETE api/invitations/guests/:user_id
// @desc    Remove guests from invitation
// @access  Private

module.exports = router;