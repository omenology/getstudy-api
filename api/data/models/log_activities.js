"use strict";
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "log_activities",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      created_by: DataTypes.JSON,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.JSON,
      deleted_at: DataTypes.DATE,
      deleted_by: DataTypes.JSON,
    },
    {
      tableName: "log_activities",
      underscored: true,
    }
  );
  Log.associate = function (models) {};
  return Log;
};
