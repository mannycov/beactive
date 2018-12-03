const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const goals = require('./routes/api/goals');

const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

// MongoDB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err => console.log(err)));

// Use Routes
app.use('/api/goals', goals);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set a static foler
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
