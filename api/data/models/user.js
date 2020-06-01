"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      role_id: DataTypes.CHAR(36),
      user_id: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      data_login: DataTypes.JSON,
      profile: DataTypes.JSON,
      verify: DataTypes.BOOLEAN,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      created_by: DataTypes.JSON,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.JSON,
      deleted_at: DataTypes.DATE,
      deleted_by: DataTypes.JSON,
    },
    {
      tableName: "user",
      underscored: true,
    }
  );
  User.associate = function (models) {
    User.belongsTo(models.role, { foreignKey: "role_id" });
  };
  return User;
};
