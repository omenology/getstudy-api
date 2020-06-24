"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      role_id: DataTypes.UUID,
      user_id: DataTypes.STRING,
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

  return User;
};
