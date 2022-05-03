const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Brokers extends Model {};

Brokers.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'brokers'
    }
);

module.exports = Brokers;