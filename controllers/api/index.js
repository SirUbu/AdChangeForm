// require dependencies
const router = require('express').Router();

// require routes
const itemRoutes = require('./item-routes');
const genDocRoutes = require('./doc-gen');

// assign routes
router.use('/items', itemRoutes);
router.use('/docgen', genDocRoutes);

// export all router routes
module.exports = router;