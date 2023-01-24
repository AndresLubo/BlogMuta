const config = require('../config/config.env.js');

const uri = `postgres://${config.database.dbUser}:${config.database.dbPassword}@${config.database.dbHost}:${config.database.dbPort}/${config.database.dbName}`;

module.exports = {
    development: {
        url: uri,
        dialect: 'postgres',
    },
    production: {
        url: uri,
        dialect: 'postgres'
    }
}
