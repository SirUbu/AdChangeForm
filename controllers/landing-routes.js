// require dependencies
const router = require('express').Router();

// get render
router.get('/', (req, res) => {
    res.render('homepage')
});

// export router
module.exports = router;