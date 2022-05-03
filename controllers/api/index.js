// require dependencies
const router = require('express').Router();

// require routes
const itemRoutes = require('./item-routes');

// assign routes
router.use('/items', itemRoutes);

// export all router routes
module.exports = router;