"use strict";

const { sequelize, DataTypes } = require("../../helpers/conection");

const Absen = sequelize.define(
  "absen",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    class_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "classes",
        key: "id",
      },
    },
    users: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    created_by: DataTypes.JSON,
    updated_at: DataTypes.DATE,
    updated_by: DataTypes.JSON,
    deleted_at: DataTypes.DATE,
    deleted_by: DataTypes.JSON,
  },
  {
    tableName: "absen",
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

module.exports = Absen;
