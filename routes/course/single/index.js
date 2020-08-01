const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");
const sha256 = require("js-sha256");

const { sequelize, Op } = require("../../../helpers/conection");
const response = require("../../../helpers/response");

const models = require("../../../data/models");
const course = models.course;
const absen = models.absen;
const classes = models.classes;

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

route.get("/absen", async (req, res) => {
  const id = req.params.id;
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id user must be uuid format");
    const cekCourse = await course.findOne({ where: { id } });
    if (!cekCourse) return response.noContent(res, "course not found");

    const dataAbsen = await course.findAndCountAll({
      where: { id },
      include: [
        {
          model: classes,
          include: [
            {
              model: absen,
            },
          ],
        },
      ],
    });

    response.ok(res, dataAbsen.rows, "fetch single data course", true, null, null, dataAbsen.count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
