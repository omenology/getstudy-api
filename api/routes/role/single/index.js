const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");

const { Sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const role = Sequelize.import("../../../data/models/role.js");

route.get("/", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id user must be uuid format");
    const data = await role.findOne({
      where: { id },
    });

    response.ok(res, data, "fetch data role", true, null, null, null);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
