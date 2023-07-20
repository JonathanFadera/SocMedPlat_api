const { connect , connection } = require('mongoose');

// Connect to the Mongo DB
connect('mongodb://localhost/socmedplat_api');

module.exports = connection;