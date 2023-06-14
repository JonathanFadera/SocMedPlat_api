const { connect , connection } = require('mongoose');

// Connect to the Mongo DB
connect(process.env.MONGODB_URI ||'mongodb://localhost/socmedplat_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;