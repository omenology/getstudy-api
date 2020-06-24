const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");

const response = require("../../../../helpers/response");

const { Sequelize, Op, models } = require("../../../data/models");
const role = models.role;

route.get("/", async (req, res) => {
  try {
    const data = await role.findAndCountAll({ where: { active: true } });
    response.ok(res, data.rows, "fetch all data roles", true, null, null, data.count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
