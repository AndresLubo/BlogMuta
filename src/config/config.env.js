require('dotenv').config()

const config = {
    app: {
      port: process.env.PORT || 3000,
    },
    database: {
      dbPort: '',
      dbName: '',
      dbUser: '',
      dbPassword: '',
      dbHost: ''
    }
}

module.exports = config;
