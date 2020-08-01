const route = require("express").Router({ mergeParams: true }); // create route

const roleControler = require("../controllers/role");

route.get("/", roleControler.get.roles);
route.get("/:id", roleControler.get.role);
route.post("/", roleControler.add);

module.exports = route;
