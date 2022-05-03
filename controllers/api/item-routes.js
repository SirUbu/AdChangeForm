// require dependencies
const router = require('express').Routher();

// require models
const { Items } = require('../../models');

// route to get a single item
router.get('/:id', (req, res) => {
    Items.findOne({
        where: {
            id: req.params.id
        },
    }).then(dbItemData => {
        if (!dbItemData) {
            res.status(404).json({ message: 'Invalid item number.' });
            return;
        }
        res.json(dbItemData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route to get items with same buyer ID
router.get('/buyerlink', (req, res) => {
    Items.findAll({
        where: {
            buyerlink_id: req.params.buyerlink
        },
    }).then(dbItemData => {
        if(!dbItemData) {
            res.status(400).json({ message: 'Invalid buyerlink number.' });
            return;
        }
        res.json(dbItemData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// export all router routes
module.exports = router;