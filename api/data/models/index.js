const Sequelize = require("sequelize");
const database = require("../../../config/database");

const env = process.env.NODE_ENV || "development";

const Op = Sequelize.Op;
const sequelize = new Sequelize(database[env].database, database[env].username, database[env].password, {
  host: database[env].host,
  dialect: database[env].dialect,
  port: database[env].port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
});

const models = {};

models.role = require("../models/role")(sequelize, Sequelize);
models.user = require("../models/user")(sequelize, Sequelize);
models.course = require("../models/course")(sequelize, Sequelize);
models.classes = require("../models/classes")(sequelize, Sequelize);
models.absen = require("../models/absen")(sequelize, Sequelize);
models.logActivities = require("../models/log_activities")(sequelize, Sequelize);

models.role.hasMany(models.user);
models.user.belongsTo(models.role, { foreignKey: "role_id" });
models.course.hasMany(models.classes);
models.classes.belongsTo(models.course, { foreignKey: "course_id" });
models.classes.hasMany(models.absen);
models.absen.belongsTo(models.classes, { foreignKey: "class_id" });

module.exports = {
  Sequelize: sequelize,
  Op,
  models,
};
