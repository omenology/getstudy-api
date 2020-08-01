"use strict";

const { sequelize, DataTypes } = require("../../helpers/conection");

const Log = sequelize.define(
  "log_activities",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data_log: DataTypes.JSON,
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
    tableName: "log_activities",
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  }
);

module.exports = Log;
