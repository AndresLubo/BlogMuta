const { Sequelize } = require('sequelize');
const config = require('../config/config.env.js');
const setupModels = require('./sequelize.initialization.js');

const uri = `postgres://${config.database.dbUser}:${config.database.dbPassword}@${config.database.dbHost}:${config.database.dbPort}/${config.database.dbName}`;

const sequelize = new Sequelize(uri, {
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize);

module.exports = sequelize;
