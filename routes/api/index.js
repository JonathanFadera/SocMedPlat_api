const router = require('express').Router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Prefix routes with appropriate path
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
