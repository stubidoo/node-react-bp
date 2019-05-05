const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
  .connect(db)
  .then( () => console.log('MongoDB Connected'))
  .catch( err => console.log(err))

app.get('/', (req, res) => res.send('Hello'));

//Use Routes
app.use('/api/users', users);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));