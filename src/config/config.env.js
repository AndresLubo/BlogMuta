require('dotenv').config()

const config = {
    app: {
      port: process.env.PORT || 3000,
    },
    database: {
      dbPort: process.env.DATABASE_PORT,
      dbName: process.env.DATABASE_NAME,
      dbUser: process.env.DATABASE_USER,
      dbPassword: process.env.DATABASE_PASSWORD,
      dbHost: process.env.DATABASE_HOST,
    }
}

module.exports = config;
