"use strict";

const { sequelize, DataTypes } = require("../../helpers/conection");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "role",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_login: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    profile: DataTypes.JSON,
    verify: DataTypes.BOOLEAN,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: DataTypes.DATE,
    created_by: DataTypes.JSON,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updated_by: DataTypes.JSON,
    deleted_at: DataTypes.DATE,
    deleted_by: DataTypes.JSON,
  },
  {
    tableName: "user",
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    defaultScope: {
      where: {
        active: true,
      },
    },
  }
);

module.exports = User;
