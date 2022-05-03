const { BuyerLinks } = require('../models');

const buyerlinkData = [
    {

    }
];

const seedBuyerlinks = () => BuyerLinks.bulkCreate(buyerlinkData);

module.exports = seedBuyerlinks;