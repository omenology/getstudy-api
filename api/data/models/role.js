"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
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
      tableName: "role",
      underscored: true,
    }
  );
  Role.associate = function (models) {
    Role.hasMany(models.user);
  };
  return Role;
};
