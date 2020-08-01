require("dotenv").config();

const jwt = require("jsonwebtoken");
const moment = require("moment");
const Joi = require("@hapi/joi");
const sha256 = require("js-sha256");

const environment = process.env.NODE_ENV || "development";
const configJWT = require("../config/jwt");

const response = require("../helpers/response");
const { sequelize, Op } = require("../helpers/conection");
const models = require("../data/models");

const userModel = models.user;
const logModel = models.logActivities;

module.exports = {
  login: async (req, res) => {
    const { body } = req;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    try {
      const { value, error } = schema.validate(body);
      if (error) return response.badrequest(res, error.message);

      const user = await userModel.findOne({ where: { email: value.email, password: sha256(value.password) } });
      if (!user) return response.unauthorized(res, "invalid credentials");

      const data = token({
        id: user.id,
        user_id: user.user_id,
        role_id: user.role_id,
        email: user.email,
        profile: user.profile,
      });

      const log = await logModel.create({
        name: "login",
        description: `login user ${user.email}`,
        data_log: user.get(),
        created_at: moment(),
        created_by: {
          id: null,
          name: "system",
        },
      });

      return response.ok(res, data, "login successfuly", null, null, null);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  isAuthenticated: async (req, res, next) => {
    try {
      const authorization = req.header("authorization");
      if (!authorization) response.unauthorized(res, "unauthorized");

      const [type, token] = authorization.split(" ");
      if (!type || !token) response.unauthorized(res, "unauthorized");

      const { data, message } = verifyToken(token);
      if (!data) response.unauthorized(res, message);

      req.decoded = data;
      next();
    } catch (error) {}
  },
};

const generateAccessToken = (dataUser) => {
  return jwt.sign(dataUser, configJWT[environment].tokenSecret, { expiresIn: `${configJWT[environment].tokenLife}h` });
};

const token = (dataUser) => {
  const accessToken = generateAccessToken(dataUser);
  const refreshToken = jwt.sign(dataUser, configJWT[environment].refreshTokenSecret, { expiresIn: `${configJWT[environment].refreshTokenLife}d` });
  return {
    accessToken,
    refreshToken,
    expTokenDate: moment().add(configJWT[environment].tokenLife, "h").toDate(),
    expRefreshTokenDate: moment().add(configJWT[environment].refreshTokenLife, "d").toDate(),
  };
};

const verifyToken = (token, secreatToken = configJWT[environment].tokenSecret) => {
  try {
    const data = jwt.verify(token, secreatToken);
    return {
      data,
      message: "token valid",
    };
  } catch (error) {
    return {
      data: null,
      message: error.message,
    };
  }
};
