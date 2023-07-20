const router = require('express').Router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Prefix routes with appropriate path
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
