const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Guest model
const Guest = require('../../models/Guest');
const User = require('../../models/User');

// @route   GET api/guests/test
// @desc    Tests guests route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Guests Works' }));

// @route   POST api/guests/
// @desc    Create new guest
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Guest.findOne({ user: req.body.user }).then(guest => {
    if (guest) {
      res.json({ guest: 'Guest already exists' })
    } else {
      // Save Profile
      new Guest({
        user: req.body.user
      }).save().then(profile => res.json(profile));
    }
  });
});

// @route   PATCH api/guests/
// @desc    Update guest
// @access  Private
router.patch('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Guest.findOne({ user: req.user.id }).then(guest => {
    if(guest) {
      guest.status = req.body.status;
      guest.save().then( guest => {
        res.json(guest);
      })
    } else {
      res.json({ guest: 'Guest does not exists' })
    }
  });
});


// @route   GET api/guests
// @desc    Get all guests
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Guest.find()
    .populate('user', ['name', 'email'])
    .then(guests => {
      if (!guests) {
        errors.noprofile = 'There are no guests';
        return res.status(404).json(errors);
      }

      res.json(guests);
    })
    .catch(err => res.status(404).json({ guests: 'There are no guests' }));
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Guest.findOneAndRemove({ user: req.body.user }).then(() => {
      User.findOneAndRemove({ _id: req.body.user }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;