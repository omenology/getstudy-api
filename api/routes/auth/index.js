const route = require("express").Router({ mergeParams: true });
const email_validator = require("email-validator");
const sha256 = require("js-sha256");

const { Sequelize, Op } = require("../../../helpers/conection");
const response = require("../../../helpers/response");

const user = Sequelize.import("../../data/models/user.js");
const role = Sequelize.import("../../data/models/role.js");
const logActivity = Sequelize.import("../../data/models/log_activities.js");

route.post("/login", async (req, res) => {
  const email = req.body.email || null;
  const password = sha256(req.body.password) || null;

  const transaction = await Sequelize.transaction();
  try {
    if (!(email || password)) return response.badrequest(res, "email or password must not be empty");
    if (!email_validator.validate(email)) return response.badrequest(res, "Email not Valid");

    const userData = await user.findOne(
      {
        where: { email, password },
      },
      { transaction }
    );

    if (!userData) return response.ok(res, "data not found", "login faild", false, null, null, null);

    const log = await logActivity.create(
      {
        name: "Login",
        description: `login user ${email}`,
        created_at: new Date(),
        created_by: "system",
      },
      { transaction }
    );

    const dataLogin = {
      accesToken: "belum",
      refreshToken: "belum",
      expAccesToken: "belum",
      expRefreshToken: "belum",
    };

    await transaction.commit();

    response.ok(res, dataLogin, "login succesfull", true, null, null);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = route;
