const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expanse = sequelize.define('expanse', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true
    },
    description : {type : Sequelize.STRING },
    money: {
        type:Sequelize.STRING

    },
    catagory:{
        type: Sequelize.STRING

    },
    
})

module.exports = Expanse;