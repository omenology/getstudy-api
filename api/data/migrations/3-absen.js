`use strict`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(`absen`, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      class_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "classes",
          key: "id",
        },
      },
      users: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      created_by: {
        type: Sequelize.JSON,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      updated_by: {
        type: Sequelize.JSON,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      deleted_by: {
        type: Sequelize.JSON,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(`absen`);
  },
};
