const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Items extends Model {};

Items.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        pack: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        buyerlink_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'items'
    }
);

module.exports = Items;