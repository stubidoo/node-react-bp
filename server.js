const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const guests = require('./routes/api/guests');
const invitations = require('./routes/api/invitations');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
  .connect(db)
  .then( () => console.log('MongoDB Connected'))
  .catch( err => console.log(err))

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.get('/', (req, res) => res.send('Hello'));

// Use Routes
app.use('/api/users', users);
app.use('/api/guests', guests);
app.use('/api/invitations', invitations);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));