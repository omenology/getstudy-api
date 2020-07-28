const models = {};

models.role = require("../models/role");
models.user = require("../models/user");
models.course = require("../models/course");
models.classes = require("../models/classes");
models.absen = require("../models/absen");
models.logActivities = require("../models/log_activities");

models.role.hasMany(models.user, { constraints: true, onUpdate: "CASCADE", onDelete: "CASCADE" });
models.user.belongsTo(models.role, { foreignKey: "role_id" });
models.course.hasMany(models.classes, { constraints: true, onUpdate: "CASCADE", onDelete: "CASCADE" });
models.classes.belongsTo(models.course, { foreignKey: "course_id" });
models.classes.hasMany(models.absen, { constraints: true, onUpdate: "CASCADE", onDelete: "CASCADE" });
models.absen.belongsTo(models.classes, { foreignKey: "class_id" });

module.exports = models;
