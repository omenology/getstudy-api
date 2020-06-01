const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");

const { Sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const role = Sequelize.import("../../../data/models/role.js");

route.get("/", async (req, res) => {
  try {
    const data = await role.findAll();
    response.ok(res, data, "fetch all data roles", true, null, null, null);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
