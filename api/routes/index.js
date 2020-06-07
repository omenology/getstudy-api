const route = require("express").Router({ mergeParams: true }); // create route

const role = require("./role"); // Route role initializing
const user = require("./user"); // Route user initializing
const auth = require("./auth"); // Route auth initializing
const classes = require("./classes"); // Route classes initializing

route.use("/role", role); // Route user
route.use("/user", user); // Route user
route.use("/auth", auth); // Route Auth
route.use("/classes", classes); // Route Classes

module.exports = route;
