const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");
const sha256 = require("js-sha256");

const { Sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const classes = Sequelize.import("../../../data/models/classes.js");
const user = Sequelize.import("../../../data/models/user.js");

route.get("/", async (req, res) => {
  const id = req.params.id;
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id user must be uuid format");
    const data = await classes.findOne({
      where: { id },
    });

    response.ok(res, data, "fetch single data classes", true, 1, 1, 1);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

route.get("/users", async (req, res) => {
  const id = req.params.id;
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id user must be uuid format");
    const idUsers = await classes.findOne({
      attributes: ["users"],
      where: { id },
    });

    const dataUsers = await user.findAndCountAll({
      where: {
        id: {
          [Op.in]: idUsers.users,
        },
      },
    });

    response.ok(res, dataUsers.rows, "fetch single data classes", true, 1, null, dataUsers.count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
