const route = require("express").Router({ mergeParams: true });
const uuid_validator = require("uuid-validate");

const { sequelize, Op } = require("../../../helpers/conection");
const response = require("../../../helpers/response");

const models = require("../../../data/models");
const role = models.role;
const user = models.user;
const logActivity = models.logActivities;

route.get("/", async (req, res) => {
  try {
    const data = await user.findAndCountAll({ where: { active: true } });

    response.ok(res, data.rows, "fetch all data users", true, null, null, data.count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

route.post("/add", async (req, res) => {
  const role_id = req.body.role_id || null;
  const user_id = req.body.user_id || null;
  const email = req.body.email || null;
  const password = sha256(req.body.password);
  const first_name = req.body.first_name || null;
  const last_name = req.body.first_name || null;
  const address = req.body.address || null;
  const images = {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    filename: "photprofildong",
  };

  const transaction = await sequelize.transaction();

  try {
    // validation data
    if ([role_id, user_id, email, first_name, last_name, address].includes(null)) return response.badrequest(res, "params with null value found");
    if (!uuid_validator(role_id)) return response.badrequest(res, "Role ID must be UUID format");
    const cekRole = await role.findOne({
      where: { id: role_id },
    });
    if (!cekRole) return response.badrequest(res, "Role Not Found");
    const addressStructure = ["street", "village", "subdistrict", "city", "province", "postal_code"];
    if (JSON.stringify(Object.keys(address)) !== JSON.stringify(addressStructure))
      return response.badrequest(res, "object address structure are wrong");

    const data = await user.create(
      {
        role_id,
        user_id,
        email,
        password,
        profile: {
          name: {
            first_name,
            last_name,
          },
          images,
          address,
        },
        verivy: true,
        active: true,
        created_at: new Date(),
        created_by: {
          id: "tes",
          type: "api",
          description: "tes description",
        },
      },
      { transaction }
    );

    const log = await logActivity.create(
      {
        name: "Create new user",
        description: `create user ${email} with role ${cekRole.name}`,
        data_log: {
          new_data: data,
          old_data: null,
        },
        created_at: new Date(),
        created_by: "system",
      },
      { transaction }
    );

    await transaction.commit();
    response.ok(res, data, "Register success", true, null, null, null);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    res.sendStatus(500);
  }
});

route.get("/tes", async (req, res) => {
  console.log("lalal");
  try {
    let data = await user.findAll({
      attributes: [[sequelize.json("profile.name.first_name"), "value"]],
      where: sequelize.json("profile.name.first_name", "Guru"),
    });

    // data = data.map((element) => {
    //   return JSON.parse(element.value);
    // });
    response.ok(res, data, "fetch all data users", true, null, null, null);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
