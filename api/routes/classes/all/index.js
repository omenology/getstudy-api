const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");
const sha256 = require("js-sha256");

const { sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const models = require("../../../data/models");
const classes = models.classes;

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
