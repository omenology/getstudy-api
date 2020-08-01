const moment = require("moment");
const Joi = require("@hapi/joi");

const { sequelize, Op } = require("../helpers/conection");
const response = require("../helpers/response");
const models = require("../data/models");
const { role } = require("../data/models");

const roleModel = models.role;

module.exports = {
  get: {
    roles: async (req, res) => {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const offset = (page - 1) * limit;

      try {
        const data = await roleModel.findAndCountAll({
          limit,
          offset,
        });
        response.ok(res, data.rows, "fetch all data roles", page, limit, data.count);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
    role: async (req, res) => {
      const id = req.params.id;

      try {
        const data = await roleModel.findByPk(id);
        response.ok(res, data, "fetch all data roles", 1, 1, 1);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
  },
  add: async (req, res) => {
    const { body } = req;
    try {
      const { value, error } = bodySchema.validate(body);
      if (error) return response.badrequest(res, error.message);

      const dataRole = await roleModel.create({
        ...value,
        created_by: {
          id: "tes",
          type: "api",
          description: "tes description",
        },
      });

      return response.ok(res, dataRole.get(), "add role successful", 1, 1, 1);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};

const bodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().default(""),
}).options({ stripUnknown: true });
