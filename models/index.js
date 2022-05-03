// require models
const Items = require('./Items');
const Brokers = require('./Brokers');
const BuyerLinks = require('./BuyerLinks');

// create relations
BuyerLinks.hasMany(Items, {
    foreignKey: 'buyerlink_id'
});

Brokers.hasMany(Items, {
    foreignKey: 'broker_id'
});


// export
module.exports = {
    Items,
    Brokers,
    BuyerLinks
};