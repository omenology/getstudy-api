const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");
const sha256 = require("js-sha256");

const { Sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const course = Sequelize.import("../../../data/models/course.js");

route.get("/", async (req, res) => {
  try {
    const data = await course.findAndCountAll();

    response.ok(res, data.rows, "fetch all data course", true, null, null, data.count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

route.post("/add", async (req, res) => {
  const name = req.body.name || null;
  const description = req.body.description || "";

  const transaction = await Sequelize.transaction();
  try {
    if (!name) return response.badrequest(res, "Name can't be null");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
