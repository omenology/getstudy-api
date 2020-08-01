const moment = require("moment");
const Joi = require("@hapi/joi");

const { sequelize, Op } = require("../helpers/conection");
const response = require("../helpers/response");
const models = require("../data/models");

const roleModel = models.role;
const userModel = models.user;

module.exports = {
  get: {
    users: async (req, res) => {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const offset = (page - 1) * limit;

      try {
        const data = await userModel.findAndCountAll({
          limit,
          offset,
        });
        response.ok(res, data.rows, "fetch all data user", page, limit, data.count);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
    user: async (req, res) => {
      const { id } = req.params;

      try {
        const data = await userModel.findByPk(id);
        response.ok(res, data, "fetch data user", 1, 1, 1);
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

      const dataRole = await roleModel.findByPk(value.role_id);
      if (!dataRole) return response.badrequest(res, "Role Not Found");

      const dataUser = await dataRole.createUser({
        ...value,
        verivy: true,
        created_by: {
          id: "tes",
          type: "api",
          description: "tes description",
        },
      });

      return response.ok(res, dataUser.get(), "add user successful", 1, 1, 1);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};

const bodySchema = Joi.object({
  role_id: Joi.string().guid().required(),
  user_id: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  data_login: Joi.object(),
  profile: Joi.object({
    name: Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
    }).required(),
    images: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string(),
    }).required(),
    address: Joi.object({
      street: Joi.string().required(),
      village: Joi.string().required(),
      subdistrict: Joi.string().required(),
      city: Joi.string().required(),
      province: Joi.string().required(),
      postal_code: Joi.string().required(),
    }).required(),
  }).required(),
}).options({ stripUnknown: true });
