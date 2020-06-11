"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("classes", [
      {
        id: "0e338454-96b0-42f8-bed3-5dfe0115f6ca",
        course_id: "807d2638-454c-4c54-a9fb-e5096e633659",
        name: "Bahasa Sunda IPA 1",
        description: "Pelajaran Bahasa Sunda kelas IPA",
        users: JSON.stringify([
          "0f58b9b6-deda-41b1-af8f-274d1955ad3e",
          "a7417ada-7e5f-47a3-8c90-e25532c486cc",
          "924a0d29-7a0a-40ef-85ab-9934b9383da1",
        ]),
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "185e72b5-8f27-4ca7-9e98-6d21f4c2ee04",
        course_id: "a7e164f3-38bc-4f3c-89ac-345e4835cffe",
        name: "Matematika IPS 1",
        description: "Pelajaran Matematika kelas IPS",
        users: JSON.stringify(["c396b942-9e81-4852-b369-bf756c768720", "924a0d29-7a0a-40ef-85ab-9934b9383da1"]),
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "1d9a5acf-aedd-48d4-a6ca-e5e2fa374f11",
        course_id: "7bfa49ee-28e4-48cc-b695-8f260407296b",
        name: "Seni dan Budaya IPS 2",
        description: "Pelajaran Seni dan Budaya kelas IPS",
        users: JSON.stringify([
          "0f58b9b6-deda-41b1-af8f-274d1955ad3e",
          "a7417ada-7e5f-47a3-8c90-e25532c486cc",
          "924a0d29-7a0a-40ef-85ab-9934b9383da1",
        ]),
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
    return queryInterface.bulkDelete("classes", null, {});
  },
};
