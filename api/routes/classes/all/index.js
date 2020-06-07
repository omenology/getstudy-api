const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");
const sha256 = require("js-sha256");

const { Sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const classes = Sequelize.import("../../../data/models/classes.js");

route.get("/", async (req, res) => {
  try {
    const data = await classes.findAndCountAll();

    response.ok(res, data.rows, "fetch all data classes", true, null, null, data.count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
