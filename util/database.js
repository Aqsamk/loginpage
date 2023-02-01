const Sequelize = require('sequelize')
const sequelize = new Sequelize('node-complete','root','Money@+%9039',{
    dialect: 'mysql',
    host: 'localhost'})

module.exports = sequelize;