const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('Sign-up-form', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true
    },
    name: Sequelize.STRING,
    email: {
        type:Sequelize.STRING,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        unique: true
    },
    ispremiumuser:{
        type:Sequelize.BOOLEAN,
        default:false
    }
})

module.exports = User;