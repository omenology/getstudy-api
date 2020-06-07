"use strict";
module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define(
    "classes",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      course_id: DataTypes.UUID,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
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
      tableName: "classes",
      underscored: true,
    }
  );
  Classes.associate = function (models) {
    Classes.belongsTo(models.course, { foreignKey: "course_id" });
  };
  return Classes;
};
