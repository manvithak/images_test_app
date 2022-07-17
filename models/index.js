'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const types = require('pg').types;
const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  host: process.env.DB_HOST,
  port: 5432,
  dialect: 'postgres'
}
types.setTypeParser(1114, function(stringValue) {
  return stringValue
});

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {
    Image: require('./Image')(sequelize, Sequelize.DataTypes)
};
 

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;