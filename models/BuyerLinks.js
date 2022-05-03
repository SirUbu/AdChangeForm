const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class BuyerLinks extends Model {};

BuyerLinks.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'buyerlinks'
    }
);

module.exports = BuyerLinks;