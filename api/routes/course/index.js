const route = require("express").Router({ mergeParams: true }); // Create router

const all = require("./all"); // all routing initialization
const single = require("./single"); // single routing initialization

route.use("/", all); // all routing
route.use("/:id", single); // single routing

module.exports = route;
