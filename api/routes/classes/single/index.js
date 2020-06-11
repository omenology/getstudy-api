const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");

const { Sequelize, Op } = require("../../../../helpers/conection");
const response = require("../../../../helpers/response");

const classes = Sequelize.import("../../../data/models/classes.js");
const user = Sequelize.import("../../../data/models/user.js");
const logActivities = Sequelize.import("../../../data/models/log_activities.js");

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
    if (!uuid_validator(id)) return response.badrequest(res, "id classes must be uuid format");
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

    response.ok(res, dataUsers.rows, "fetch users in classes", true, 1, null, dataUsers.count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

route.get("/users/notin", async (req, res) => {
  const id = req.params.id;

  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id classes must be uuid format");
    const dataUsers = await classes.findOne({
      attributes: ["users"],
      where: { id },
    });

    const dataUsersNotin = await user.findAndCountAll({
      where: {
        [Op.and]: [{ id: { [Op.notIn]: dataUsers.users } }, { role_id: { [Op.not]: "05bf3d41-1aa7-4651-af06-1dc217808911" } }],
      },
    });

    response.ok(res, dataUsersNotin.rows, "fetch all user not in classes", true, 1, null, dataUsersNotin.count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

route.post("/users/add", async (req, res) => {
  const id = req.params.id;
  const users = req.body.users;

  const transaction = await Sequelize.transaction();
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id classes must be uuid format");
    if (!Array.isArray(users)) return response.badrequest(res, "user id colections must be array format");
    users.forEach((value) => {
      if (!uuid_validator(value)) return response.badrequest(res, "id user must be uuid format");
    });

    const usersIn = await classes.findOne({
      where: { id },
    });

    if (!usersIn) return response.noContent(res, "class not found");

    let newUsersIn = usersIn.users.concat(users);
    newUsersIn.filter((value, index) => {
      return newUsersIn.indexOf(value) == index;
    });

    const updateClass = await classes.update(
      {
        users: newUsersIn,
      },
      {
        where: { id },
      },
      { transaction }
    );

    const log = await logActivities.create(
      {
        name: "Add users into class",
        description: `add users into class ${usersIn.name} by saha`,
        created_at: new Date(),
        created_by: "system",
      },
      { transaction }
    );

    const updatedClass = await classes.findOne({ where: { id } });

    await transaction.commit();
    return response.ok(res, updatedClass, "added users to class succesfull", true, 1, 1, 1);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    res.sendStatus(500);
  }
});

route.delete("/users/delete", async (req, res) => {
  const id = req.params.id;
  const users = req.body.users;

  const transaction = await Sequelize.transaction();
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id classes must be uuid format");
    if (!Array.isArray(users)) return response.badrequest(res, "user id colections must be array format");
    users.forEach((value) => {
      if (!uuid_validator(value)) return response.badrequest(res, "id user must be uuid format");
    });

    const usersIn = await classes.findOne({
      where: { id },
    });

    if (!usersIn) return response.noContent(res, "class not found");

    const newUsersIn = usersIn.users.filter((value) => {
      return !users.includes(value);
    });

    const updateClass = await classes.update(
      {
        users: newUsersIn,
      },
      {
        where: { id },
      },
      { transaction }
    );

    const log = await logActivities.create(
      {
        name: "delete users from class",
        description: `add users from class ${usersIn.name} by saha`,
        created_at: new Date(),
        created_by: "system",
      },
      { transaction }
    );

    const updatedClass = await classes.findOne({ where: { id } });

    await transaction.commit();
    return response.ok(res, updatedClass, "removed users from class succesfull", true, 1, 1, 1);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
