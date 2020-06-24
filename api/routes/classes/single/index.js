const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");

const response = require("../../../../helpers/response");

const { Sequelize, Op, models } = require("../../../data/models");
const classes = models.classes;
const logActivities = models.logActivities;
const absen = models.absen;
const user = models.user;
const role = models.role;

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
        updated_at: new Date(),
        updated_by: {
          id: "id saha",
          name: "add user from class",
          description: "add user from class",
        },
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
        updated_at: new Date(),
        updated_by: {
          id: "id saha",
          name: "delete user from class",
          description: "delete user from class",
        },
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

route.get("/absen", async (req, res) => {
  const id = req.params.id;

  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id classes must be uuid format");
    const cekClass = await classes.findOne({
      where: { id },
    });
    if (!cekClass) return response.noContent(res, "class not found");

    const data = await absen.findAndCountAll({
      attributes: ["users", "created_at"],
      where: {
        class_id: id,
        active: true,
      },
    });
    return response.ok(res, data.rows, "get abssen", true, null, null, data.count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

route.post("/absen/add", async (req, res) => {
  const id = req.params.id;
  const users = req.body.users;

  const transaction = await Sequelize.transaction();
  try {
    if (!uuid_validator(id)) return response.badrequest(res, "id classes must be uuid format");
    if (!Array.isArray(users)) return response.badrequest(res, "user id colections must be array format");

    users.forEach((value) => {
      if (!uuid_validator(value)) return response.badrequest(res, "id user must be uuid format");
    });

    const cekClass = await classes.findOne({
      where: { id },
    });
    if (!cekClass) return response.noContent(res, "class not found");

    const cekUser = await user.count({
      where: { [Op.and]: [{ role_id: "d6438c76-fe58-4c29-87e5-7314283f76ce" }, { id: { [Op.in]: users } }] },
    });
    if (cekUser == 0) return response.badrequest(res, "user id colections must be contain at least one role guru");

    const createAbsen = await absen.create(
      {
        class_id: id,
        users,
        created_at: new Date(),
        created_by: {},
      },
      { transaction }
    );

    const log = await logActivities.create(
      {
        name: "create absen",
        description: `create absen ${cekClass.name} by saha`,
        created_at: new Date(),
        created_by: "system",
      },
      { transaction }
    );

    await transaction.commit();
    return response.ok(res, createAbsen, "create abssen succesful", true, null, null, null);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
