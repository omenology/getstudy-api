const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");
const sha256 = require("js-sha256");

const { Sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const course = Sequelize.import("../../../data/models/course.js");

route.get("/", async (req, res) => {
  const id = req.params.id;
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id user must be uuid format");
    const data = await course.findOne({
      where: { id },
    });

    response.ok(res, data, "fetch single data course", true, 1, 1, 1);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
