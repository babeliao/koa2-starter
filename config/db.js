/**
 * Created by liaoyunda on 16/11/22.
 */
const Sequelize = require('sequelize');
const config = require('./config');

var db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

module.exports = db;
