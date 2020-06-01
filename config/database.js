"use strict";

require("dotenv").config(); // Loads environment variables from a .env file into process.env -> https://www.npmjs.com/package/dotenv

module.exports = {
  // Development Environment
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "getstudy_db",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    dialect: "mariadb",
  },
  // Production Environment
  production: {
    username: process.env.DB_USERNAME || "my_user",
    password: process.env.DB_PASSWORD || "my_password",
    database: process.env.DB_NAME || "my_db",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    dialect: "mariadb",
  },
};
