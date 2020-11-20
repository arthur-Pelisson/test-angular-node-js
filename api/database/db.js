const Sequelize = require('sequelize');
var config = require('./database.json')["dev"];
const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password, {
    host: config.host,
    dialect: config.dialect,
    operatorAliases: false,
    logging: console.log,
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize;