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

  new Invitation({
    users: req.body.users
  }).save()
  .then(profile => res.json(profile));
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

// @route   GET api/invitations/:invitation_id
// @desc    Get an invitation
// @access  Private
router.get('/:invitation_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Invitation.findById(req.params.invitation_id)
  .populate('guests', ['user', 'status', 'primary_guest'])
    .then( invitation => {
      if(invitation) 
      {
        res.json(invitation)
      } else {
        res.json({invitation: 'Invitation does not exist'})
      }
    })
});

// @route   GET api/invitations/
// @desc    Get all invitations
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Invitation.find()
  .populate('users', ['name', 'email', 'status', 'primary_guest'])
  .then( invitations => {
    if(invitations) {
      res.json(invitations)
    } else {
      res.json({invitations: 'There are no invitations'})
    }
  })
});


// @route   DELETE api/invitations/:invitation_id
// @desc    Remove an invitation
// @access  Private
router.delete('/:invitation_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Invitation.findById(req.params.invitation_id)
      .then(invitation => {
        if(invitation) {

          if(invitation.guests.length > 0) {
            res.json({invitation: 'Invitation contains guests, remove guests first'})
          } else {
            res.json({invitation: 'Invitation removed succesfully'})
            invitation.remove().exec();
          }
          
          
        } else {
          res.json({invitation: 'Invitation does not exist'})
        }
      })
      .catch(err => res.status(404).json(err));
});


// @route   DELETE api/invitations/guests/:guest_id
// @desc    Remove guests from invitation
// @access  Private
router.delete('/guests/:guest_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Invitation.findById(req.params.guest_id)
      .then(invitation => {
        
        // TODO: Query invitations for the guest id

        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
});


module.exports = router;