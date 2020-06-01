const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");

const { Sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const user = Sequelize.import("../../../data/models/user.js");

route.get("/", async (req, res) => {
  try {
    const data = await user.findAll();

    response.ok(res, data, "fetch all data users", true, null, null, null);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
