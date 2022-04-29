// require dependencies
const router = require('express').Router();

// get render
router.get('/', (req, res) => {
    res.render('landing-page')
});

// export router
module.exports = router;