'use strict';

const Sequelize = require('sequelize');
const config = require('config');
const fs = require("fs");
const path = require("path");
const _ = require("underscore");

const sequelize = new Sequelize(config.database.mysql.database, config.database.mysql.username, config.database.mysql.password, {
    host: config.database.mysql.host,
    dialect: 'mysql',
    timezone: config.database.mysql.timezone,
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
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

let db = {};


// Dynamically load model classes and integrate with Sequelize ORM.
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

// Make association between entities
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }

    db[modelName].sync().then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      })


});

// Welcome Note
console.log("________  .__  _____  _____                            __   ");
console.log("\\______ \\ |__|/ ____\\/ ____\\___________   ____   _____/  |_ ");
console.log(" |    |  \\|  \\   __\\\\   __\\/ __ \\_  __ \\_/ __ \\ /    \\   __\\");
console.log(" |    `   \\  ||  |   |  | \\  ___/|  | \\/\\  ___/|   |  \\  |  ");
console.log("/_______  /__||__|   |__|  \\___  >__|    \\___  >___|  /__|  " + config.appname + ' | v' + config.version);
console.log("        \\/                     \\/            \\/     \\/      \n");

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;