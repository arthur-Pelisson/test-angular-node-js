const Sequelize = require('sequelize');
const sequelize = require('../database/db.js');
const bcrypt = require('bcrypt');
var debug = require('debug');
var cb = require('cb');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  created: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},
  {
    tableName: 'users', timestamps: false,
  }
);

User.beforeCreate((user, options) => {

  return bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      throw new Error();
    });
});


module.exports = User;

