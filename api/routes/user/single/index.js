const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");

const { sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const models = require("../../../data/models");
const role = models.role;
const user = models.user;
const logActivity = models.logActivities;

route.get("/", async (req, res) => {
  const id = req.params.id;
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id user must be uuid format");
    const data = await user.findByPk(id);

    response.ok(res, data, "fetch data users", true, null, null, null);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

route.get("/classes", async (req, res) => {
  const id = req.params.id;
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id user must be uuid format");
    const data = await classes.findAll({
      attributes: { exclude: ["created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by"] },
      where: {
        [Op.and]: [{ active: true }, sequelize.literal(`JSON_CONTAINS(users, '["${id}"]') `)],
      },
      limit: 10,
    });

    response.ok(res, data, "fetch data users", true, null, 10, null);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
