const route = require("express").Router({ mergeParams: true }); // create route

const userController = require("../controllers/user");

route.get("/", userController.get.users);
route.get("/:id", userController.get.user);
route.post("/", userController.add);

module.exports = route;
