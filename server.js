const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const connectToDatabase = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    // Routes
    app.use(routes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
