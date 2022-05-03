const { Items } = require('../models');

const itemData = [
    {

    }
];

const seedItems = () => Items.bulkCreate(itemData);

module.exports = seedItems;