const { Sequelize } = require('sequelize');
require('dotenv/config.js');

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

module.exports = sequelize;