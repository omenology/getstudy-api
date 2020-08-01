const moment = require("moment");
const Joi = require("@hapi/joi");

const { sequelize, Op } = require("../helpers/conection");
const response = require("../helpers/response");
const models = require("../data/models");

const courseModel = models.course;
const classesModel = models.classes;

module.exports = {
  get: {
    clasess: async (req, res) => {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const offset = (page - 1) * limit;

      try {
        const data = await classesModel.findAndCountAll({
          limit,
          offset,
        });
        response.ok(res, data.rows, "fetch all data classes", page, limit, data.count);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
    class: async (req, res) => {
      const { id } = req.params;

      try {
        const data = await classesModel.findByPk(id);
        response.ok(res, data, "fetch data class", 1, 1, 1);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
  },
};
