// require dependencies
const router = require('express').Router();

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
            res.status(404).json({ message: `${req.params.id} is and invalid item number.` });
            return;
        }
        res.json(dbItemData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route to get items with same buyer ID
router.get('/buyerlink/:id', (req, res) => {
    Items.findAll({
        where: {
            buyerlink_id: req.params.id
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