const route = require("express").Router({ mergeParams: true }); // Create router

const all = require("./all"); // all routing initialization

route.use("/", all); // all routing

module.exports = route;
