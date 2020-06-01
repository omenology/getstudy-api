const sequelize = require("sequelize");
const database = require("../config/database");

const env = process.env.NODE_ENV || "development";

const Op = sequelize.Op;
const Sequelize = new sequelize("getstudy_db", "root", "", {
  host: database[env].host,
  dialect: database[env].dialect,
  port: database[env].port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
});

module.exports = {
  Sequelize,
  Op,
};
