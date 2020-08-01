"use strict";

const { sequelize, DataTypes } = require("../../helpers/conection");

const Classes = sequelize.define(
  "classes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "course",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: "classes",
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

module.exports = Classes;
