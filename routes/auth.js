const route = require("express").Router({ mergeParams: true }); // create route

const authController = require("../controllers/auth");

route.post("/login", authController.login);

module.exports = route;
