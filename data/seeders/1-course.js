"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("course", [
      {
        id: "807d2638-454c-4c54-a9fb-e5096e633659",
        name: "Bahasa Sunda",
        description: "Pelajaran Bahasa Sunda",
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "a7e164f3-38bc-4f3c-89ac-345e4835cffe",
        name: "Matematika",
        description: "Pelajaran Matematika",
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "7bfa49ee-28e4-48cc-b695-8f260407296b",
        name: "Seni dan Budaya",
        description: "Pelajaran Seni dan Budaya",
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("course", null, {});
  },
};
