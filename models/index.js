// require models
const Items = require('./Items');
const BuyerLinks = require('./BuyerLinks');

// create relations
BuyerLinks.hasMany(Items, {
    foreignKey: 'buyerlink_id'
});

// export
module.exports = {
    Items,
    BuyerLinks
};