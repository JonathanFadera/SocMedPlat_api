const router = require('express').Router();
const apiRoutes = require('./api');

// API routes
router.use('/api', apiRoutes);
router.use((req, res) => {
    return res.status(404).send('Error 404 not found');
});

module.exports = router;
