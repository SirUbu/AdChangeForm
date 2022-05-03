// require seed js
const seedItems = require('./items-seeds');
const seedBuyerlinks = require('./buyerlinks-seeds');

// require sequelize config
const sequelize = require('../config/connection');

// function to seed data
const seedAll = async () => {
    await sequelize.sync({ force: true});
    console.log(`\n---- DATABASE SYNCED ----\n`);

    await seedItems();
    console.log(`\n---- ITEMS SEEDED ----\n`);

    await seedBuyerlinks();
    console.log(`\n---- BUYERLINKS SEEDED ----\n`);

    console.log(`\n---- ALL SEED DATA COMPLETED ----\n`);

    process.exit(0);
};

seedAll();