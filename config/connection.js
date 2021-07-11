require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
    // Database name
    process.env.DB_NAME, 
    // User
    process.env.DB_USER, 
    // Password
    process.env.DB_PW, 
    {
      // Database Location
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
