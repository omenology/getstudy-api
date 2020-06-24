"use strict";
module.exports = (sequelize, DataTypes) => {
  const absen = sequelize.define(
    "absen",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      class_id: DataTypes.UUID,
      users: DataTypes.JSON,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      created_by: DataTypes.JSON,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.JSON,
      deleted_at: DataTypes.DATE,
      deleted_by: DataTypes.JSON,
    },
    {
      tableName: "absen",
      underscored: true,
    }
  );

  return absen;
};
