// require dependencies
const router = require('express').Router();

// require routes
const apiRoutes = require('./api');
const landingRoutes = require('./landing-routes');

// assign routes
router.use('/api', apiRoutes);
router.use('/', landingRoutes);

// export all router routes
module.exports = router;