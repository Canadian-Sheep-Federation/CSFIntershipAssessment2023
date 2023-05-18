const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

class Attendee extends Model {}

Attendee.init({
    name: {
        type: DataTypes.STRING
    },
    food_item: {
        type: DataTypes.STRING
    },
    food_type: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'attendee'
})

module.exports = Attendee;
